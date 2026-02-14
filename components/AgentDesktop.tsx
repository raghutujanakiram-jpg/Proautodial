
import React, { useState, useEffect, useRef } from 'react';
import { TranscriptLine } from '../types';
import * as gemini from '../services/geminiService';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

// --- Audio Utilities for Live API ---
function encodePCM(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function createBlob(data: Float32Array): { data: string; mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encodePCM(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

const AgentDesktop: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [aiInsights, setAiInsights] = useState<{ sentiment: string, suggestedResponse: string, objection: string } | null>(null);
  const [noteInput, setNoteInput] = useState('');
  const [callSummary, setCallSummary] = useState<{ summary: string, outcome: string, followUps: string[], overallSatisfaction: string } | null>(null);
  const [checkedFollowUps, setCheckedFollowUps] = useState<Set<number>>(new Set());
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSummaryCollapsed, setIsSummaryCollapsed] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [simulateErrors, setSimulateErrors] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Live API Refs
  const sessionRef = useRef<any>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const currentTranscriptionRef = useRef<string>('');

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  // Handle manual trigger for segment analysis
  const handleManualAnalysis = async () => {
    if (transcript.length === 0 || isAnalyzing) return;
    setIsAnalyzing(true);
    setApiError(null);
    
    // Simulate API Error check
    if (simulateErrors && Math.random() > 0.4) {
      setTimeout(() => {
        setApiError("Neural Analysis Node Failure: Sequence packet drop detected.");
        setIsAnalyzing(false);
      }, 800);
      return;
    }

    const lastLines = transcript.slice(-8).map(t => `${t.speaker}: ${t.text}`).join('\n');
    try {
      const insight = await gemini.getCallInsight(lastLines);
      setAiInsights(insight);
    } catch (err) {
      console.error("Neural insight sync failed", err);
      setApiError("Intelligence synchronization interrupted. Verify link status.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const processLineSentiment = async (text: string, index: number) => {
    try {
      // Simulate error check for sentiment stream
      if (simulateErrors && Math.random() > 0.7) throw new Error("Packet loss in sentiment node");

      const result = await gemini.getFastResponse(`Analyze the sentiment of this transcript line: "${text}". Respond ONLY with one word: Positive, Neutral, or Negative.`);
      const sentiment = result.replace('[⚡ Flash Lite Response]: ', '').trim() as any;
      setTranscript(prev => prev.map((line, i) => i === index ? { ...line, sentiment: sentiment.toLowerCase() } : line));
    } catch (e) {
      console.error("Sentiment sync failed", e);
      // Fail gracefully: line remains without icon
    }
  };

  const toggleFollowUp = (idx: number) => {
    const next = new Set(checkedFollowUps);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    setCheckedFollowUps(next);
  };

  const saveCallToHistory = () => {
    if (transcript.length === 0) return;
    const now = new Date();
    const timestampStr = now.toLocaleString();
    const historyItem = {
      id: crypto.randomUUID(),
      timestamp: now.toISOString(),
      displayTime: timestampStr,
      contactName: 'Mark Stephenson',
      transcript,
      summary: callSummary,
      insights: aiInsights
    };
    const existing = JSON.parse(localStorage.getItem('proautodial_call_history') || '[]');
    localStorage.setItem('proautodial_call_history', JSON.stringify([historyItem, ...existing]));
    setLastSaved(timestampStr);
  };

  const terminateCall = async () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }

    setIsActive(false);
    setIsRecording(false);
    setIsSummarizing(true);
    setApiError(null);

    try {
      if (simulateErrors && Math.random() > 0.5) throw new Error("Summary synthesis interrupted");

      const fullText = transcript.map(t => `${t.speaker}: ${t.text}`).join('\n');
      const summary = await gemini.generateCallSummary(fullText);
      setCallSummary(summary);
      setCheckedFollowUps(new Set());
      saveCallToHistory();
    } catch (err) {
      console.error("Post-call synthesis failed", err);
      setApiError("Synthesis Error: Post-call brief generation failed.");
    } finally {
      setIsSummarizing(false);
    }
  };

  const establishLiveLink = async () => {
    setCallSummary(null);
    setAiInsights(null);
    setLastSaved(null);
    setApiError(null);
    setIsActive(true);
    setIsRecording(true);
    setTranscript([{ speaker: 'ai', text: 'Neural Transcriber Link Establishing...', timestamp: new Date().toLocaleTimeString() }]);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    inputAudioContextRef.current = inputCtx;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          systemInstruction: 'You are a real-time call transcriber. Transcribe everything heard accurately.',
        },
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              if (isMuted || isOnHold) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
            setTranscript(prev => [...prev, { speaker: 'ai', text: 'Quantum Uplink Active. Operational.', timestamp: new Date().toLocaleTimeString() }]);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              currentTranscriptionRef.current += text;
              
              setTranscript(prev => {
                const last = prev[prev.length - 1];
                if (last && last.speaker === 'agent') {
                  const updated = [...prev];
                  updated[updated.length - 1] = { ...last, text: currentTranscriptionRef.current };
                  return updated;
                } else {
                  return [...prev, { speaker: 'agent', text: currentTranscriptionRef.current, timestamp: new Date().toLocaleTimeString() }];
                }
              });
            }

            if (message.serverContent?.turnComplete) {
              const finalizedText = currentTranscriptionRef.current;
              currentTranscriptionRef.current = '';
              setTranscript(prev => {
                const idx = prev.length - 1;
                processLineSentiment(finalizedText, idx);
                return prev;
              });
              handleManualAnalysis();
            }
          },
          onerror: (e) => {
            console.error("Live Hub Error", e);
            setApiError("Neural Link Exception: Connection dropped.");
          },
          onclose: () => setIsActive(false),
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Device link failed", err);
      setApiError("Hardware Access Denied: Microphone permissions required.");
      setIsActive(false);
    }
  };

  const getSentimentIcon = (sentiment?: string) => {
    switch(sentiment?.toLowerCase()) {
      case 'positive': return <i className="fas fa-face-smile text-emerald-500 text-lg shadow-sm" title="Positive Sentiment"></i>;
      case 'negative': return <i className="fas fa-face-frown text-rose-500 text-lg shadow-sm" title="Negative Sentiment"></i>;
      case 'neutral': return <i className="fas fa-face-meh text-slate-400 text-lg shadow-sm" title="Neutral Sentiment"></i>;
      default: return <i className="fas fa-circle-notch fa-spin text-slate-500/20 text-lg"></i>;
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-950 text-white flex flex-col transition-all selection:bg-brand/30">
      <div className="flex-1 flex flex-col gap-6 p-8">
        
        {/* Error Notification Bar */}
        {apiError && (
          <div className="bg-rose-600/20 border border-rose-600 p-4 rounded-2xl flex items-center justify-between animate-fade-in shadow-lg">
             <div className="flex items-center gap-3">
               <i className="fas fa-triangle-exclamation text-rose-500"></i>
               <p className="text-xs font-black uppercase tracking-widest text-rose-100">{apiError}</p>
             </div>
             <button onClick={() => setApiError(null)} className="text-rose-500 hover:text-white transition-colors">
               <i className="fas fa-times"></i>
             </button>
          </div>
        )}

        {/* Global Call Controller */}
        <div className="flex flex-col lg:flex-row justify-between items-center bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 rounded-[3rem] shadow-2xl gap-8 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand to-brand-light opacity-50"></div>
           
           <div className="flex items-center gap-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all shadow-xl ${isActive ? 'bg-emerald-500 animate-pulse text-white shadow-emerald-500/20' : 'bg-slate-800 text-slate-500'}`}>
                <i className={`fas ${isActive ? 'fa-microphone' : 'fa-phone-slash'}`}></i>
              </div>
              <div className="space-y-1">
                 <h2 className="text-2xl font-black">{isActive ? 'Live Neural Session' : 'Operational Standby'}</h2>
                 <div className="flex items-center gap-3">
                   <button 
                     onClick={() => isActive && setIsRecording(!isRecording)}
                     className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${isRecording ? 'bg-rose-500/10 border-rose-500 text-rose-500' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                   >
                     <i className={`fas fa-circle mr-2 ${isRecording ? 'animate-pulse' : ''}`}></i>
                     {isRecording ? 'REC ACTIVE' : 'RECORDING OFF'}
                   </button>
                   <div className="h-3 w-px bg-slate-800"></div>
                   <button 
                     onClick={() => setSimulateErrors(!simulateErrors)}
                     className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${simulateErrors ? 'bg-brand/20 border-brand text-brand' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                   >
                     <i className="fas fa-bug mr-2"></i>
                     {simulateErrors ? 'CHAOS MODE: ON' : 'STABLE MODE'}
                   </button>
                 </div>
              </div>
           </div>

           <div className="flex gap-4">
              <button 
                onClick={() => isActive && setIsMuted(!isMuted)}
                className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border transform active:scale-90 ${isMuted ? 'bg-amber-500 border-amber-400 text-white shadow-lg shadow-amber-500/40' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'}`}
              >
                <i className={`fas ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'} text-lg`}></i>
                <span className="text-[8px] font-black uppercase tracking-tighter">Mute</span>
              </button>
              <button 
                onClick={() => isActive && setIsOnHold(!isOnHold)}
                className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border transform active:scale-90 ${isOnHold ? 'bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-500/40' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'}`}
              >
                <i className={`fas ${isOnHold ? 'fa-play' : 'fa-pause'} text-lg`}></i>
                <span className="text-[8px] font-black uppercase tracking-tighter">Hold</span>
              </button>
              <button 
                onClick={() => isActive && setIsTransferring(!isTransferring)}
                className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border transform active:scale-90 ${isTransferring ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/40 animate-pulse' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'}`}
              >
                <i className="fas fa-share-nodes text-lg"></i>
                <span className="text-[8px] font-black uppercase tracking-tighter">X-Fer</span>
              </button>
           </div>

           <div className="flex flex-col items-end gap-2">
              <div className="flex gap-4">
                {!isActive ? (
                  <>
                    <button onClick={establishLiveLink} className="px-10 py-5 bg-brand text-white rounded-2xl font-black uppercase text-xs shadow-2xl shadow-brand/30 hover:scale-105 active:scale-95 transition-all">
                       Establish Live Link
                    </button>
                    {transcript.length > 2 && (
                      <button onClick={saveCallToHistory} className="px-8 py-5 bg-slate-800 text-white rounded-2xl font-black uppercase text-xs border border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-3">
                        <i className="fas fa-save"></i> Archive
                      </button>
                    )}
                  </>
                ) : (
                  <button onClick={terminateCall} className="px-12 py-5 bg-rose-600 text-white rounded-2xl font-black uppercase text-xs shadow-2xl shadow-rose-600/30 hover:brightness-110 active:scale-95 transition-all">
                     Terminate Link
                  </button>
                )}
              </div>
              {lastSaved && (
                <p className="text-[9px] font-black uppercase text-emerald-500 tracking-widest flex items-center gap-2 animate-fade-in pr-2">
                  <i className="fas fa-circle-check"></i> Logged: {lastSaved}
                </p>
              )}
           </div>
        </div>

        {/* Dashboard Workspace */}
        <div className="flex-1 grid lg:grid-cols-4 gap-8 h-full min-h-0">
           
           {/* Dialogue Hub */}
           <div className="lg:col-span-3 bg-slate-900/60 border border-slate-800 rounded-[3rem] p-10 flex flex-col overflow-hidden relative shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-brand border border-slate-700">
                       <i className="fas fa-terminal"></i>
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight">Intelligence Stream</h3>
                 </div>
                 <div className="flex gap-3">
                   <button 
                    onClick={handleManualAnalysis}
                    disabled={isAnalyzing || transcript.length === 0}
                    className="px-6 py-2 bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-700 hover:bg-brand transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
                   >
                     {isAnalyzing ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-brain-circuit"></i>}
                     Manual Trigger
                   </button>
                   {isActive && (
                     <div className="px-4 py-2 bg-brand/10 text-brand rounded-xl text-[10px] font-black uppercase tracking-widest border border-brand/20 animate-pulse">
                        <i className="fas fa-waveform mr-2"></i> Transcribing...
                     </div>
                   )}
                 </div>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar">
                 {transcript.length === 0 && !isSummarizing && (
                   <div className="h-full flex flex-col items-center justify-center text-slate-800 gap-6 opacity-30">
                      <i className="fas fa-satellite text-[8rem] animate-float"></i>
                      <p className="font-black uppercase tracking-widest text-sm text-center">System Idle - Awaiting Signal</p>
                   </div>
                 )}
                 
                 {isSummarizing && (
                    <div className="h-full flex flex-col items-center justify-center gap-8 animate-pulse text-center">
                      <div className="w-24 h-24 bg-brand/20 rounded-full flex items-center justify-center text-brand">
                        <i className="fas fa-brain-circuit text-5xl"></i>
                      </div>
                      <h4 className="text-2xl font-black uppercase tracking-tighter">Synthesizing Final Brief...</h4>
                    </div>
                 )}

                 {callSummary && (
                    <div className={`bg-brand/5 border border-brand/20 rounded-[3rem] p-8 mb-8 transition-all duration-500 relative overflow-hidden group shadow-xl ${isSummaryCollapsed ? 'h-24 p-6' : 'h-auto'}`}>
                       <div className="absolute top-0 right-0 p-8 opacity-5 text-brand pointer-events-none group-hover:opacity-10 transition-opacity">
                         <i className="fas fa-memo-circle-info text-8xl"></i>
                       </div>
                       
                       <div className="flex items-center justify-between mb-6">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-brand rounded-2xl flex items-center justify-center text-white shadow-lg">
                              <i className="fas fa-clipboard-check text-xl"></i>
                            </div>
                            <div>
                               <h4 className="text-lg font-black tracking-tight">{isActive ? 'Active Summary' : 'Executive Post-Call Brief'}</h4>
                               <p className="text-[8px] font-black uppercase tracking-widest text-brand">Neural Optimization Engine</p>
                            </div>
                         </div>
                         <button 
                          onClick={() => setIsSummaryCollapsed(!isSummaryCollapsed)}
                          className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-all shadow-md active:scale-95"
                         >
                            <i className={`fas fa-chevron-${isSummaryCollapsed ? 'down' : 'up'}`}></i>
                         </button>
                       </div>

                       {!isSummaryCollapsed && (
                         <div className="grid md:grid-cols-2 gap-10 animate-fade-in-up">
                            <div className="space-y-6">
                               <div>
                                 <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">Outcome Intelligence</p>
                                 <p className="text-sm font-bold italic text-slate-200 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">"{callSummary.summary}"</p>
                               </div>
                               <div className="flex gap-6">
                                  <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Status</p>
                                    <p className="text-xs font-black text-brand uppercase">{callSummary.outcome}</p>
                                  </div>
                                  <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Sentiment</p>
                                    <p className="text-xs font-black text-emerald-500 uppercase">{callSummary.overallSatisfaction}</p>
                                  </div>
                               </div>
                            </div>
                            <div className="space-y-4">
                              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Task Checklist (Follow-ups)</p>
                              <div className="space-y-2">
                                 {callSummary.followUps.map((item, idx) => (
                                   <button 
                                     key={idx} 
                                     onClick={() => toggleFollowUp(idx)}
                                     className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all shadow-inner group/item text-left ${checkedFollowUps.has(idx) ? 'bg-emerald-500/10 border-emerald-500/40 opacity-70' : 'bg-slate-950/50 border-white/5 hover:border-brand/30'}`}
                                   >
                                     <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${checkedFollowUps.has(idx) ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-600 group-hover/item:text-brand group-hover/item:bg-brand/10'}`}>
                                       {checkedFollowUps.has(idx) ? <i className="fas fa-check text-[10px]"></i> : <i className="fas fa-square text-[10px]"></i>}
                                     </div>
                                     <span className={`text-[10px] font-bold ${checkedFollowUps.has(idx) ? 'text-emerald-500 line-through' : 'text-slate-300'}`}>{item}</span>
                                   </button>
                                 ))}
                              </div>
                            </div>
                         </div>
                       )}
                    </div>
                 )}

                 {transcript.map((line, i) => (
                   <div key={i} className={`flex ${line.speaker === 'customer' ? 'justify-start' : 'justify-end'} animate-fade-in group`}>
                      <div className={`max-w-[75%] p-6 rounded-[2.5rem] relative shadow-lg flex flex-col gap-3 ${
                        line.speaker === 'customer' ? 'bg-slate-800/80 text-slate-200 border-l-4 border-blue-500 shadow-xl' : 
                        line.speaker === 'ai' ? 'bg-brand/10 text-brand border border-brand/20 italic font-semibold text-xs' : 
                        'bg-slate-700/80 text-white border-r-4 border-brand shadow-xl'
                      }`}>
                         <div className="flex items-center justify-between gap-6">
                            <div className="flex items-center gap-3">
                              <div className="p-1 rounded-lg bg-slate-950/30">
                                {getSentimentIcon(line.sentiment)}
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">{line.speaker}</span>
                            </div>
                            <span className="text-[9px] font-bold opacity-30">{line.timestamp}</span>
                         </div>
                         <p className="text-sm font-medium leading-relaxed">{line.text}</p>
                      </div>
                   </div>
                 ))}
                 <div ref={scrollRef} />
              </div>

              {/* Agent Interface */}
              <div className="mt-8 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row gap-6">
                 <div className="flex-1 relative">
                    <input 
                      placeholder="Input strategic response or session note..." 
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-8 py-5 text-sm font-bold outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all shadow-inner placeholder:text-slate-800" 
                    />
                 </div>
                 <button className="px-12 bg-brand text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest shadow-lg shadow-brand/20 hover:brightness-110 active:scale-95 transition-all">
                    Transmit Node
                 </button>
              </div>
           </div>

           {/* Copilot Pane */}
           <div className="flex flex-col gap-6">
              <div className="flex-1 bg-slate-900/60 border border-slate-800 rounded-[3rem] p-8 flex flex-col gap-8 shadow-2xl relative overflow-hidden group backdrop-blur-sm">
                 <div className="absolute top-0 right-0 p-8 text-brand/5 pointer-events-none group-hover:scale-110 transition-transform duration-[3s]">
                    <i className="fas fa-shield-heart text-[12rem]"></i>
                 </div>
                 
                 <div className="space-y-1 relative z-10">
                    <h3 className="text-2xl font-black text-brand flex items-center gap-3">
                       <i className="fas fa-microchip-ai"></i> Copilot
                    </h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Neural Sync Active</p>
                 </div>
                 
                 <div className="space-y-8 flex-1 relative z-10 overflow-y-auto custom-scrollbar pr-2">
                    {/* Sentiment Tracker */}
                    <div className="space-y-3">
                       <label className="text-[9px] font-black uppercase tracking-widest text-slate-600">Dynamic Pulse</label>
                       <div className="p-4 bg-slate-950/60 rounded-2xl border border-white/5 flex items-center justify-between shadow-inner">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-lg ${
                                aiInsights?.sentiment === 'Negative' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 
                                aiInsights?.sentiment === 'Positive' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                                'bg-slate-800 text-slate-500'
                            }`}>
                               {getSentimentIcon(aiInsights?.sentiment || 'neutral')}
                            </div>
                            <span className="text-sm font-black tracking-tight uppercase">{aiInsights?.sentiment || 'Analyzing...'}</span>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${aiInsights?.sentiment === 'Negative' ? 'bg-rose-500' : 'bg-emerald-500'} animate-pulse shadow-[0_0_12px_rgba(255,255,255,0.4)]`}></div>
                       </div>
                    </div>

                    {/* AI Suggestions */}
                    <div className="space-y-4">
                       <label className="text-[9px] font-black uppercase tracking-widest text-slate-600">Tactical Coaching</label>
                       <div className="bg-brand/10 border border-brand/20 rounded-[2rem] p-6 space-y-5 relative overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 p-4 text-brand/20 pointer-events-none">
                            <i className="fas fa-bolt text-4xl"></i>
                          </div>
                          <p className="text-sm font-bold italic text-white leading-relaxed relative z-10">
                            {aiInsights?.suggestedResponse ? (
                              `“${aiInsights.suggestedResponse}”`
                            ) : (
                              "Awaiting speech patterns for live strategic coaching..."
                            )}
                          </p>
                          {aiInsights?.suggestedResponse && (
                            <button 
                              onClick={() => setNoteInput(aiInsights.suggestedResponse)}
                              className="w-full bg-brand text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-brand/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 relative z-10"
                            >
                              <i className="fas fa-paste"></i> Apply Logic
                            </button>
                          )}
                       </div>
                    </div>

                    {/* Objections */}
                    <div className="space-y-3">
                       <label className="text-[9px] font-black uppercase tracking-widest text-slate-600">Friction Tracker</label>
                       <div className={`p-5 rounded-2xl flex items-center gap-4 text-sm font-black shadow-inner border transition-all ${aiInsights?.objection ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-slate-950/40 border-white/5 text-slate-700'}`}>
                          <i className={`fas ${aiInsights?.objection ? 'fa-shield-halved' : 'fa-circle-check'}`}></i>
                          <span className="uppercase tracking-tight truncate">{aiInsights?.objection || 'Interaction Clear'}</span>
                       </div>
                    </div>
                 </div>

                 <div className="pt-6 border-t border-slate-800/50 space-y-3 relative z-10">
                    <button className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-brand hover:text-white transition-all shadow-xl active:scale-95">
                       Log Qualification
                    </button>
                    <button className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest border border-slate-700 hover:border-brand/40 transition-all active:scale-95">
                       Escalate Node
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDesktop;
