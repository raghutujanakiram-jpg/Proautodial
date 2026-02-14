
import React, { useState, useRef, useEffect } from 'react';
import * as gemini from '../services/geminiService';
import { ChatMessage, AspectRatio } from '../types';

const AIPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'creative' | 'analysis' | 'voice' | 'maps'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasApiKey, setHasApiKey] = useState(false);
  
  // Creative State
  const [imagePrompt, setImagePrompt] = useState('');
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>(AspectRatio.SQUARE);
  const [highQuality, setHighQuality] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Voice State
  const [selectedVoice, setSelectedVoice] = useState('Kore');
  const availableVoices = ['Kore', 'Zephyr', 'Puck', 'Charon', 'Fenrir'];

  // Analysis State
  const [analysisResult, setAnalysisResult] = useState('');
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const progressInterval = useRef<any>(null);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      }
    };
    checkKey();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Loading progress simulation for image generation
  useEffect(() => {
    if (loading && (activeTab === 'creative')) {
      setLoadingProgress(0);
      progressInterval.current = setInterval(() => {
        setLoadingProgress(prev => (prev < 90 ? prev + Math.random() * 10 : prev));
      }, 500);
    } else {
      clearInterval(progressInterval.current);
      setLoadingProgress(0);
    }
    return () => clearInterval(progressInterval.current);
  }, [loading, activeTab]);

  const handleOpenKeyDialog = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      // Proceed immediately to bridge race conditions as per guidelines
      setHasApiKey(true);
    }
  };

  const handleChat = async (mode: 'standard' | 'grounded' | 'thinking' | 'fast' | 'maps') => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      if (mode === 'grounded') {
        const { text, sources } = await gemini.getSearchGroundedResponse(input);
        setMessages(prev => [...prev, { role: 'model', text, sources }]);
      } else if (mode === 'maps') {
        const { text, sources } = await gemini.getMapsGroundedResponse(input);
        setMessages(prev => [...prev, { role: 'model', text, sources }]);
      } else if (mode === 'thinking') {
        const text = await gemini.getThinkingResponse(input);
        setMessages(prev => [...prev, { role: 'model', text, isThinking: true }]);
      } else if (mode === 'fast') {
        const text = await gemini.getFastResponse(input);
        setMessages(prev => [...prev, { role: 'model', text: `[⚡ Flash Lite Response]: ${text}` }]);
      } else {
        const text = await gemini.getGeminiProResponse(input);
        setMessages(prev => [...prev, { role: 'model', text }]);
      }
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes('Requested entity was not found') || err.message?.includes('caller does not have permission')) {
        setHasApiKey(false);
        setMessages(prev => [...prev, { role: 'model', text: 'Authentication error. Please re-select your professional API key to continue.' }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: 'Operation failed. Node synchronization lost.' }]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt) return;
    if (highQuality && !hasApiKey) {
      await handleOpenKeyDialog();
    }
    setLoading(true);
    try {
      const url = await gemini.generateImage(imagePrompt, selectedRatio, highQuality);
      setGeneratedImage(url);
    } catch (err: any) {
      if (err.message?.includes('permission') || err.message?.includes('403')) {
        setHasApiKey(false);
        alert('High-fidelity models require a valid project key.');
      } else {
        alert('Synthesis failed. Sequence interrupted.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAnimate = async () => {
    if (!uploadedImage) return;
    if (!hasApiKey) {
      await handleOpenKeyDialog();
    }
    setLoading(true);
    try {
      const base64 = uploadedImage.split(',')[1];
      const url = await gemini.generateVideoFromImage(base64, imagePrompt || "Animate this scene naturally.");
      setVideoUrl(url);
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes('permission')) setHasApiKey(false);
      alert('Veo video synthesis requires a paid GCP billing project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-32 transition-colors duration-500">
      {/* Refined API Key Banner */}
      {!hasApiKey ? (
        <div className="mb-12 p-8 bg-brand/5 border-2 border-brand/20 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-in shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-brand group-hover:rotate-12 transition-transform duration-1000">
             <i className="fas fa-lock text-[12rem]"></i>
          </div>
          <div className="flex items-center gap-8 relative z-10">
            <div className="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand/30 animate-pulse">
               <i className="fas fa-key-skeleton text-2xl"></i>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Premium Models Restricted</h3>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                Access to <strong>Veo Video Synthesis</strong>, <strong>Gemini 3 Pro</strong>, and <strong>High-Quality Image Nodes</strong> requires a professional project API key with billing enabled.
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="ml-2 underline text-brand hover:text-brand-dark transition-colors inline-flex items-center gap-1">Docs <i className="fas fa-external-link text-[10px]"></i></a>
              </p>
            </div>
          </div>
          <button 
            onClick={handleOpenKeyDialog}
            className="relative z-10 px-12 py-5 bg-brand text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] shadow-2xl shadow-brand/40 transition-all active:scale-95 whitespace-nowrap border border-brand/20"
          >
            Authenticate Project Key
          </button>
        </div>
      ) : (
        <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-between animate-fade-in">
           <div className="flex items-center gap-3 px-4">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
             <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Strategic Project Key Active — Full Multimodal Access Granted</p>
           </div>
           <button onClick={handleOpenKeyDialog} className="px-4 py-2 text-[10px] font-black uppercase text-slate-500 hover:text-brand transition-all border border-transparent hover:border-brand/20 rounded-xl">Switch Uplink</button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Playroom Tabs */}
        <aside className="lg:w-72 flex-shrink-0 space-y-3">
          <div className="p-6 bg-brand/5 rounded-3xl mb-8">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-brand mb-1">Neural Playground</h2>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Multi-Engine Test Lab</p>
          </div>
          {[
            { id: 'chat', icon: 'fa-message-bot', label: 'Interaction' },
            { id: 'creative', icon: 'fa-wand-sparkles', label: 'Synthesis' },
            { id: 'analysis', icon: 'fa-magnifying-glass-pulse', label: 'Deep Intel' },
            { id: 'voice', icon: 'fa-waveform', label: 'Vocal Lab' },
            { id: 'maps', icon: 'fa-location-dot', label: 'Maps Grounding' },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full text-left px-6 py-4 rounded-2xl font-bold transition-all flex items-center gap-4 ${activeTab === tab.id ? 'bg-brand text-white shadow-xl shadow-brand/30 scale-[1.02]' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-800'}`}
            >
              <i className={`fas ${tab.icon} text-lg`}></i> {tab.label}
            </button>
          ))}
        </aside>

        {/* Console Interface */}
        <main className="flex-1 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col min-h-[700px]">
          
          {(activeTab === 'chat' || activeTab === 'maps') && (
            <div className="flex-1 flex flex-col h-full animate-fade-in">
              <div className="p-8 border-b dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-between">
                <div>
                  <h3 className="font-black text-2xl tracking-tight">
                    {activeTab === 'maps' ? 'Grounded Location Search' : 'Conversational Intel Hub'}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Provider: Gemini 3 Advanced Node</p>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-10 space-y-6 max-h-[500px] custom-scrollbar bg-slate-50/30 dark:bg-transparent">
                {messages.length === 0 && (
                  <div className="text-center py-20 opacity-40">
                    <i className={`fas ${activeTab === 'maps' ? 'fa-map-location' : 'fa-brain-circuit'} text-6xl text-brand mb-6 block mx-auto animate-float`}></i>
                    <p className="text-slate-400 font-black tracking-widest uppercase text-sm">Waiting for Neural Handshake...</p>
                  </div>
                )}
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                    <div className={`max-w-[85%] rounded-[1.5rem] p-6 shadow-xl ${m.role === 'user' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700'}`}>
                      {m.isThinking && <div className="text-[9px] uppercase font-black text-brand mb-3 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand rounded-full animate-ping"></span> Cognitive Budget Active...</div>}
                      <p className="whitespace-pre-wrap text-sm font-medium leading-relaxed">{m.text}</p>
                      {m.sources && m.sources.length > 0 && (
                        <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-700">
                           <p className="text-[9px] font-black uppercase text-slate-500 mb-3 tracking-widest">Grounding Citations:</p>
                           <div className="flex flex-wrap gap-2">
                             {m.sources.map((s, i) => (
                               <a key={i} href={s.uri} target="_blank" className="px-3 py-1.5 bg-slate-100 dark:bg-slate-950 rounded-lg text-[10px] font-black text-brand hover:bg-brand hover:text-white transition-all truncate max-w-[180px] shadow-sm">{s.title}</a>
                             ))}
                           </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <div className="p-8 bg-slate-50/50 dark:bg-slate-950/30 border-t dark:border-slate-800 space-y-6">
                <div className="flex gap-4">
                  <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleChat(activeTab === 'maps' ? 'maps' : 'standard')}
                    placeholder={activeTab === 'maps' ? "Inquire about global service endpoints..." : "Initiate strategic dialogue..."}
                    className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-brand/5 outline-none transition-all shadow-inner placeholder:text-slate-700"
                  />
                  <button 
                    disabled={loading}
                    onClick={() => handleChat(activeTab === 'maps' ? 'maps' : 'standard')}
                    className="bg-brand text-white w-16 h-14 rounded-2xl flex items-center justify-center hover:brightness-110 shadow-xl shadow-brand/20 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-paper-plane'} text-lg`}></i>
                  </button>
                </div>
                {activeTab === 'chat' && (
                  <div className="flex flex-wrap gap-3">
                    {[
                      { mode: 'fast', label: 'Flash 2.5 Lite', icon: 'fa-bolt' },
                      { mode: 'grounded', label: 'Google Grounding', icon: 'fab fa-google' },
                      { mode: 'thinking', label: 'Cognitive Mode', icon: 'fa-brain-circuit' }
                    ].map(btn => (
                      <button 
                        key={btn.mode}
                        disabled={loading}
                        onClick={() => handleChat(btn.mode as any)}
                        className="flex-1 py-3 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-brand hover:border-brand transition-all flex items-center justify-center gap-2 shadow-sm"
                      >
                        <i className={`fas ${btn.icon}`}></i> {btn.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'creative' && (
            <div className="p-10 space-y-12 overflow-y-auto animate-fade-in custom-scrollbar">
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h4 className="font-black text-2xl tracking-tight">Neural Image Synthesis</h4>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Gemini 3 Pro Imaging</p>
                  </div>
                  <textarea 
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="Envision a high-end corporate identity visual..."
                    className="w-full h-40 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 text-sm font-bold outline-none focus:ring-4 focus:ring-brand/10 transition-all resize-none shadow-inner placeholder:text-slate-800"
                  />
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-3">
                      {Object.values(AspectRatio).map((ratio) => (
                        <button 
                          key={ratio}
                          onClick={() => setSelectedRatio(ratio)}
                          className={`py-3 rounded-xl border transition-all text-[9px] font-black tracking-widest uppercase ${selectedRatio === ratio ? 'bg-brand text-white border-brand shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:border-brand'}`}
                        >
                          {ratio}
                        </button>
                      ))}
                    </div>
                    <label className="flex items-center gap-4 cursor-pointer group p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-white/5">
                      <div 
                        onClick={() => {
                          if (!hasApiKey && !highQuality) handleOpenKeyDialog();
                          setHighQuality(!highQuality);
                        }}
                        className={`w-12 h-6 rounded-full p-1 transition-all ${highQuality ? 'bg-brand' : 'bg-slate-300 dark:bg-slate-700'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${highQuality ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-widest">Enable 1K HD Preview</span>
                        {!hasApiKey && <span className="text-[8px] font-black uppercase text-brand">Authenticated Project Required</span>}
                      </div>
                    </label>
                  </div>
                  <button 
                    disabled={loading}
                    onClick={handleGenerateImage}
                    className="w-full py-6 bg-brand text-white rounded-[1.5rem] font-black text-lg hover:scale-[1.01] shadow-2xl shadow-brand/30 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {loading ? <i className="fas fa-spinner fa-spin mr-3"></i> : <i className="fas fa-sparkles mr-3"></i>}
                    Synthesize Visual
                  </button>
                </div>

                <div className="bg-slate-100 dark:bg-slate-950 rounded-[3rem] flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 relative overflow-hidden min-h-[450px] shadow-inner group">
                  {loading && (
                    <div className="absolute inset-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center p-12 animate-fade-in">
                      <div className="w-full max-w-xs space-y-6">
                         <div className="flex justify-between text-[10px] font-black uppercase text-brand tracking-widest px-1">
                           <span>Synthesizing...</span>
                           <span>{Math.round(loadingProgress)}%</span>
                         </div>
                         <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner border border-brand/10">
                           <div className="h-full bg-brand transition-all duration-300 shadow-[0_0_20px_rgba(219,93,67,0.6)]" style={{ width: `${loadingProgress}%` }}></div>
                         </div>
                         <p className="text-center text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] animate-pulse">Orchestrating Multimodal Tensors</p>
                      </div>
                    </div>
                  )}
                  {generatedImage ? (
                    <img src={generatedImage} alt="Generated strategy visual" className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-1000 shadow-2xl" />
                  ) : (
                    <div className="text-center p-12 space-y-6 opacity-20">
                      <i className="fas fa-image text-8xl text-slate-400"></i>
                      <p className="text-xs font-black uppercase tracking-[0.4em]">Visual Feed Idle</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-12 border-t dark:border-slate-800 grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h4 className="font-black text-2xl tracking-tight">Veo Neural Animation</h4>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Cinematic Sequence Hub</p>
                  </div>
                  <div className="space-y-6">
                     <label className="cursor-pointer block">
                       <div className="w-full py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] bg-slate-50 dark:bg-slate-950 text-slate-600 font-black text-xs flex flex-col items-center justify-center gap-4 hover:border-brand/40 transition-all group/up">
                         <i className="fas fa-cloud-arrow-up text-3xl group-hover/up:animate-bounce"></i> 
                         {uploadedImage ? 'Ready for Motion Handshake' : 'Upload Keyframe Source'}
                       </div>
                       <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                     </label>
                     <button 
                        disabled={!uploadedImage || loading}
                        onClick={handleAnimate}
                        className="w-full py-6 bg-slate-950 text-white dark:bg-white dark:text-slate-950 rounded-[1.5rem] font-black text-lg hover:scale-[1.01] shadow-2xl transition-all active:scale-95 disabled:opacity-50"
                      >
                         <i className="fas fa-clapperboard mr-3"></i> 
                         {hasApiKey ? 'Animate Sequence' : 'Locked Feature'}
                      </button>
                      {!hasApiKey && (
                        <div className="p-4 bg-brand/10 border border-brand/20 rounded-2xl text-center">
                           <p className="text-[9px] font-black uppercase text-brand tracking-widest leading-relaxed">Sequence generation requires a paid billing project key.</p>
                        </div>
                      )}
                  </div>
                </div>

                <div className="bg-black rounded-[3rem] flex items-center justify-center overflow-hidden min-h-[450px] shadow-2xl relative">
                  {videoUrl ? (
                    <video src={videoUrl} controls autoPlay className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center opacity-10">
                      <i className="fas fa-video-slash text-8xl"></i>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="p-12 space-y-12 animate-fade-in h-full flex flex-col">
               <div className="max-w-3xl mx-auto w-full space-y-10">
                 <div className="text-center space-y-3">
                   <h4 className="font-black text-4xl tracking-tighter">Cognitive Analysis</h4>
                   <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">Multi-Engine OCR & Content Extraction</p>
                 </div>
                 
                 <div className="bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[4rem] p-20 text-center relative overflow-hidden group shadow-inner">
                   {uploadedImage ? (
                     <img src={uploadedImage} className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm group-hover:opacity-60 group-hover:blur-none transition-all duration-1000" alt="Analysis context" />
                   ) : (
                     <div className="relative z-10 space-y-6">
                       <i className="fas fa-microchip-ai text-7xl text-brand opacity-20 block mx-auto"></i>
                       <p className="text-slate-500 font-black tracking-widest uppercase text-xs">Awaiting Multimodal Signal...</p>
                     </div>
                   )}
                   <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-6">
                   <button 
                    disabled={!uploadedImage || loading}
                    onClick={async () => {
                      setLoading(true);
                      const res = await gemini.analyzeImage(uploadedImage!.split(',')[1], "Provide a deep strategic analysis of this image content for enterprise application.");
                      setAnalysisResult(res || '');
                      setLoading(false);
                    }}
                    className="py-5 bg-brand text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                   >
                     Strategic Synthesis
                   </button>
                   <button 
                    disabled={!uploadedImage || loading}
                    onClick={async () => {
                      setLoading(true);
                      const res = await gemini.analyzeImage(uploadedImage!.split(',')[1], "Perform high-fidelity OCR and return all detected text structures.");
                      setAnalysisResult(res || '');
                      setLoading(false);
                    }}
                    className="py-5 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                   >
                     OCR Extraction
                   </button>
                 </div>
                 
                 {analysisResult && (
                   <div className="p-10 bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 animate-fade-in shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-6 right-8 text-[9px] font-black uppercase text-brand tracking-widest">Neural Result</div>
                     <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed font-bold italic">
                       {analysisResult}
                     </p>
                   </div>
                 )}
               </div>
            </div>
          )}

          {activeTab === 'voice' && (
             <div className="p-12 space-y-12 animate-fade-in">
               <div className="max-w-4xl mx-auto space-y-12">
                 <div className="flex items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center text-brand border border-brand/20 shadow-xl">
                        <i className="fas fa-waveform-lines text-3xl"></i>
                      </div>
                      <div>
                        <h4 className="font-black text-3xl tracking-tight leading-none mb-2">Vocal Synthesis Engine</h4>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Ring-LLM Native Audio Node</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-slate-500 ml-1">Identity Selection</label>
                      <select 
                        value={selectedVoice}
                        onChange={(e) => setSelectedVoice(e.target.value)}
                        className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-3 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-brand/5 shadow-inner"
                      >
                        {availableVoices.map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                 </div>
                 
                 <p className="text-xl text-slate-500 font-medium leading-relaxed">
                   Generate realistic vocal sequences for automated responses using the {selectedVoice} identity node.
                 </p>
                 
                 <textarea 
                   placeholder="Input target script for vocalization..."
                   className="w-full h-52 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 text-sm font-bold outline-none focus:ring-4 focus:ring-brand/5 transition-all shadow-inner resize-none placeholder:text-slate-800"
                   onChange={(e) => setInput(e.target.value)}
                   value={input}
                 />
                 
                 <button 
                   disabled={loading || !input}
                   onClick={async () => {
                     setLoading(true);
                     try {
                       const b64 = await gemini.generateSpeech(input, selectedVoice);
                       if (b64) {
                         const audio = new Audio(`data:audio/wav;base64,${b64}`);
                         audio.play();
                       }
                     } catch (e) {
                       alert("Uplink timeout: Audio synthesis failed.");
                     } finally {
                       setLoading(false);
                     }
                   }}
                   className="w-full py-7 bg-brand text-white rounded-[1.5rem] font-black text-xl hover:scale-[1.01] shadow-2xl shadow-brand/40 transition-all active:scale-95 flex items-center justify-center gap-5 disabled:opacity-50"
                 >
                   {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-play-circle"></i>}
                   Synthesize Sequence
                 </button>
               </div>
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AIPlayground;
