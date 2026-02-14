
import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as gemini from '../services/geminiService';

interface VoicePreset {
  id: string;
  name: string;
  trait: string;
  gender: 'Male' | 'Female';
  tags: string[];
  isFavorite: boolean;
  createdAt: number;
}

const LANGUAGES = [
  { name: 'Telugu', code: 'te', group: 'Indian' },
  { name: 'Hindi', code: 'hi', group: 'Indian' },
  { name: 'Tamil', code: 'ta', group: 'Indian' },
  { name: 'Kannada', code: 'kn', group: 'Indian' },
  { name: 'Malayalam', code: 'ml', group: 'Indian' },
  { name: 'Marathi', code: 'mr', group: 'Indian' },
  { name: 'Bengali', code: 'bn', group: 'Indian' },
  { name: 'Gujarati', code: 'gu', group: 'Indian' },
  { name: 'Punjabi', code: 'pa', group: 'Indian' },
  { name: 'Odia', code: 'or', group: 'Indian' },
  { name: 'English (Global)', code: 'en', group: 'Global' },
  { name: 'Spanish', code: 'es', group: 'Global' },
  { name: 'French', code: 'fr', group: 'Global' },
  { name: 'German', code: 'de', group: 'Global' },
  { name: 'Arabic', code: 'ar', group: 'Global' },
  { name: 'Japanese', code: 'ja', group: 'Global' },
];

const VoiceAgentsService: React.FC = () => {
  // Persistence & Basic State
  const [script, setScript] = useState(() => localStorage.getItem('savedScript') || '');
  const [intensity, setIntensity] = useState(50);
  const [vibratoRate, setVibratoRate] = useState(30);
  const [vibratoDepth, setVibratoDepth] = useState(20);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  
  // Language & Music
  const [outputLanguage, setOutputLanguage] = useState('Telugu');
  const [langSearch, setLangSearch] = useState('');
  const [isGeneratingMusic, setIsGeneratingMusic] = useState(false);
  const [generatedMusicInfo, setGeneratedMusicInfo] = useState<{ genre: string, vibe: string } | null>(null);
  const [musicGenre, setMusicGenre] = useState('Cinematic');

  // Tone Analysis State
  const [isAnalyzingTone, setIsAnalyzingTone] = useState(false);
  const [toneSummary, setToneSummary] = useState<{ mood: string, tone: string, score: number, interpretation: string } | null>(null);

  // Voice Preset Management State
  const [activePresetId, setActivePresetId] = useState<string | null>('1');
  const [sortOption, setSortOption] = useState<'name' | 'date'>('name');
  const [filterTag, setFilterTag] = useState<string>('All');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [voicePresets, setVoicePresets] = useState<VoicePreset[]>(() => {
    const saved = localStorage.getItem('voice_presets');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Kore', trait: 'Strategic / Professional', gender: 'Male', tags: ['Enterprise', 'Firm'], isFavorite: true, createdAt: 1700000000000 },
      { id: '2', name: 'Zephyr', trait: 'Warm / Empathetic', gender: 'Female', tags: ['Support', 'Soft'], isFavorite: false, createdAt: 1700000010000 },
      { id: '3', name: 'Puck', trait: 'High-Energy / Youthful', gender: 'Male', tags: ['Sales', 'Bright'], isFavorite: true, createdAt: 1700000020000 },
      { id: '4', name: 'Charon', trait: 'Authoritative / Deep', gender: 'Male', tags: ['Security', 'Bass'], isFavorite: false, createdAt: 1700000030000 },
      { id: '5', name: 'Fenrir', trait: 'Crisp / Sophisticated', gender: 'Male', tags: ['Consulting'], isFavorite: false, createdAt: 1700000040000 },
    ];
  });

  // Recording & Cloning State
  const [isRecording, setIsRecording] = useState(false);
  const [clarityScore, setClarityScore] = useState(0);
  const [waveform, setWaveform] = useState<number[]>(Array(40).fill(0));
  const recordInterval = useRef<any>(null);

  // Welcome Message State
  const [welcomeVoice, setWelcomeVoice] = useState('Zephyr');
  const [welcomeAudioUrl, setWelcomeAudioUrl] = useState<string | null>(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('savedScript', script);
  }, [script]);

  useEffect(() => {
    localStorage.setItem('voice_presets', JSON.stringify(voicePresets));
  }, [voicePresets]);

  // Simulated Recording Waveform & Clarity
  useEffect(() => {
    if (isRecording) {
      recordInterval.current = setInterval(() => {
        setWaveform(prev => prev.map(() => Math.random() * 100));
        setClarityScore(prev => {
          const next = 80 + Math.random() * 18; // Fluctuate clarity between 80-98
          return parseFloat(next.toFixed(1));
        });
      }, 100);
    } else {
      clearInterval(recordInterval.current);
      setWaveform(Array(40).fill(0));
      setClarityScore(0);
    }
    return () => clearInterval(recordInterval.current);
  }, [isRecording]);

  // Derived Values
  const filteredLanguages = useMemo(() => {
    const query = langSearch.toLowerCase();
    const list = LANGUAGES.filter(l => l.name.toLowerCase().includes(query));
    // Prioritize Indian group
    return [
      ...list.filter(l => l.group === 'Indian'),
      ...list.filter(l => l.group !== 'Indian')
    ];
  }, [langSearch]);

  const allTags = useMemo(() => {
    const tags = new Set<string>(['All']);
    voicePresets.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [voicePresets]);

  const processedPresets = useMemo(() => {
    let result = [...voicePresets];
    if (filterTag !== 'All') {
      result = result.filter(p => p.tags.includes(filterTag));
    }
    result.sort((a, b) => {
      if (sortOption === 'name') return a.name.localeCompare(b.name);
      return b.createdAt - a.createdAt; // Newest first
    });
    // Favorites always on top
    return result.sort((a, b) => (a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1));
  }, [voicePresets, sortOption, filterTag]);

  // Quality Indicator Label
  const getQualityLabel = (score: number) => {
    if (score === 0) return 'Standby';
    if (score > 90) return 'Crystal Clear';
    if (score > 85) return 'Optimal';
    return 'Needs Improvement';
  };

  // Handlers
  const toggleFavorite = (id: string) => {
    setVoicePresets(prev => prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
  };

  const removePreset = (id: string) => {
    setVoicePresets(prev => prev.filter(p => p.id !== id));
    if (activePresetId === id) setActivePresetId(null);
  };

  const clearAllPresets = () => {
    setVoicePresets([]);
    setShowClearConfirm(false);
    setActivePresetId(null);
  };

  const handleAudition = async (voice: string, id: string) => {
    if (!script.trim()) return;
    setIsSynthesizing(true);
    setActivePresetId(id);
    try {
      const contextPrompt = `[Language: ${outputLanguage}] [Intensity: ${intensity}%] [Vibrato: ${vibratoRate}% Rate, ${vibratoDepth}% Depth] ${script}`;
      const b64 = await gemini.generateSpeech(contextPrompt, voice);
      if (b64) {
        const audio = new Audio(`data:audio/wav;base64,${b64}`);
        audio.play();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleGenerateWelcome = async () => {
    setIsSynthesizing(true);
    try {
      const text = `Welcome to the Neural Interface in ${outputLanguage}. Current node health is optimal.`;
      const b64 = await gemini.generateSpeech(text, welcomeVoice);
      if (b64) {
        const url = `data:audio/wav;base64,${b64}`;
        setWelcomeAudioUrl(url);
        const audio = new Audio(url);
        audio.play();
      }
    } catch (e) {
      alert("Neural synthesis failed.");
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleAnalyzeTone = async () => {
    if (!script.trim()) return;
    setIsAnalyzingTone(true);
    try {
      const response = await gemini.getGeminiProResponse(
        `Perform a deep tone analysis for: "${script}". 
        Evaluate mood, professional tone, and engagement score.
        Return ONLY a JSON object: { "mood": string, "tone": string, "score": number, "interpretation": string }`
      );
      const cleaned = response.replace(/```json|```/g, '').trim();
      setToneSummary(JSON.parse(cleaned));
    } catch (e) {
      console.error("Analysis node error", e);
    } finally {
      setIsAnalyzingTone(false);
    }
  };

  const handleGenerateMusic = async () => {
    setIsGeneratingMusic(true);
    try {
      const prompt = `Based on the script: "${script}", generate a fitting ${musicGenre} background track description. Script tone is: ${toneSummary?.tone || 'Neutral'}. Return JSON: { "genre": string, "vibe": string }`;
      const res = await gemini.getGeminiProResponse(prompt);
      const cleaned = res.replace(/```json|```/g, '').trim();
      setGeneratedMusicInfo(JSON.parse(cleaned));
      await new Promise(r => setTimeout(r, 1500));
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingMusic(false);
    }
  };

  const getMoodIcon = (mood: string) => {
    const m = mood.toLowerCase();
    if (m.includes('happy') || m.includes('positive') || m.includes('joy')) return 'fa-face-smile-beam text-emerald-400';
    if (m.includes('urgent') || m.includes('alert') || m.includes('excited')) return 'fa-face-grin-stars text-amber-400';
    if (m.includes('professional') || m.includes('calm') || m.includes('serious')) return 'fa-face-tie text-blue-400';
    if (m.includes('sad') || m.includes('negative') || m.includes('concerned')) return 'fa-face-frown text-rose-400';
    return 'fa-face-meh text-slate-400';
  };

  return (
    <div className="pt-24 bg-slate-950 text-white min-h-screen overflow-hidden selection:bg-brand/30 pb-20">
      
      {/* Hero & Identity Lab */}
      <section className="relative py-20 px-6 max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Scripting & Logic */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h1 className="text-6xl font-black tracking-tighter italic">Neural <span className="text-gradient not-italic">Designer.</span></h1>
              <p className="text-slate-400 font-medium leading-relaxed">Refine your strategic identity through sub-350ms vocal synthesis and deep tone analysis.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 shadow-2xl relative">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-3">
                   <i className="fas fa-terminal text-brand"></i> Logic Input Node
                 </h3>
                 <div className="flex items-center gap-4">
                    {/* Searchable Language Selection */}
                    <div className="relative group/lang">
                        <button className="px-5 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-brand transition-all flex items-center gap-3 shadow-inner">
                           <i className="fas fa-earth-asia text-brand"></i> {outputLanguage}
                        </button>
                        <div className="absolute top-full right-0 mt-3 w-72 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl opacity-0 translate-y-3 pointer-events-none group-hover/lang:opacity-100 group-hover/lang:translate-y-0 group-hover/lang:pointer-events-auto transition-all z-[100] p-5 space-y-4">
                           <div className="relative">
                             <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-[10px]"></i>
                             <input 
                               value={langSearch}
                               onChange={(e) => setLangSearch(e.target.value)}
                               placeholder="Find Output Node..."
                               className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-[10px] font-bold outline-none focus:border-brand transition-colors"
                             />
                           </div>
                           <div className="max-h-56 overflow-y-auto custom-scrollbar space-y-1 pr-1">
                              {filteredLanguages.map(l => (
                                <button 
                                  key={l.code}
                                  onClick={() => { setOutputLanguage(l.name); setLangSearch(''); }}
                                  className={`w-full text-left px-4 py-3 rounded-xl text-[10px] font-bold transition-all flex items-center justify-between ${outputLanguage === l.name ? 'bg-brand text-white' : 'text-slate-400 hover:bg-white/5'}`}
                                >
                                  <span>{l.name}</span>
                                  {l.group === 'Indian' && <span className="opacity-40 text-[9px]">🇮🇳</span>}
                                </button>
                              ))}
                           </div>
                        </div>
                    </div>
                    <button onClick={() => setScript('')} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-600 hover:text-rose-500 transition-colors shadow-inner">
                      <i className="fas fa-trash-can text-sm"></i>
                    </button>
                 </div>
              </div>

              <textarea 
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Initialize script sequence for synthesis..."
                className="w-full h-52 bg-slate-950/50 border border-slate-800 rounded-[2rem] p-10 text-sm font-bold focus:ring-4 focus:ring-brand/10 outline-none transition-all resize-none shadow-inner mb-8 placeholder:text-slate-800"
              />

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {[
                  { label: 'Vocal Force', val: intensity, set: setIntensity, icon: 'fa-bolt' },
                  { label: 'Vibrato Hz', val: vibratoRate, set: setVibratoRate, icon: 'fa-wave-square' },
                  { label: 'Resonance', val: vibratoDepth, set: setVibratoDepth, icon: 'fa-water' }
                ].map(s => (
                  <div key={s.label} className="space-y-4 p-5 bg-slate-950/50 rounded-2xl border border-white/5 shadow-inner">
                    <div className="flex justify-between items-center">
                      <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
                        <i className={`fas ${s.icon} text-brand`}></i> {s.label}
                      </p>
                      <span className="text-[10px] font-black text-brand bg-brand/5 px-2 py-0.5 rounded border border-brand/10">{s.val}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" value={s.val}
                      onChange={(e) => s.set(parseInt(e.target.value))}
                      className="w-full accent-brand h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              <button 
                onClick={handleAnalyzeTone}
                disabled={isAnalyzingTone || !script}
                className="w-full py-5 bg-brand text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-all flex items-center justify-center gap-4 disabled:opacity-50 shadow-2xl shadow-brand/20"
              >
                {isAnalyzingTone ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-magnifying-glass-chart"></i>}
                Run Tone Intelligence
              </button>

              {toneSummary && (
                <div className="mt-10 p-10 bg-slate-950/80 border border-brand/20 rounded-[2.5rem] animate-fade-in-up relative overflow-hidden group shadow-2xl">
                   <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                      <i className={`fas ${getMoodIcon(toneSummary.mood).split(' ')[0]} text-[10rem]`}></i>
                   </div>
                   
                   <div className="flex justify-between items-center mb-10 relative z-10">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-lg">
                           <i className={`fas ${getMoodIcon(toneSummary.mood)} text-3xl`}></i>
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-white uppercase tracking-tight">{toneSummary.mood} Matrix</h4>
                          <p className="text-[10px] font-black text-brand uppercase tracking-widest flex items-center gap-2">
                             <span className="w-1.5 h-1.5 bg-brand rounded-full"></span> {toneSummary.tone}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-4xl font-black text-brand tracking-tighter leading-none">{toneSummary.score}%</span>
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-1">Sentiment Score</p>
                      </div>
                   </div>
                   
                   <div className="space-y-3 mb-10 relative z-10">
                      <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] px-1">
                        <span>Intensity Mapping</span>
                        <span>{toneSummary.score}/100</span>
                      </div>
                      <div className="h-4 bg-slate-900 rounded-full overflow-hidden border border-white/5 p-1">
                         <div className="h-full bg-brand rounded-full transition-all duration-[2000ms] shadow-[0_0_20px_rgba(219,93,67,0.4)]" style={{ width: `${toneSummary.score}%` }}></div>
                      </div>
                   </div>

                   <div className="bg-slate-900/80 border border-white/5 p-8 rounded-3xl relative z-10">
                      <p className="text-sm text-slate-300 leading-relaxed font-bold italic">"{toneSummary.interpretation}"</p>
                   </div>
                </div>
              )}
            </div>

            {/* Music Lab Integration */}
            <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 text-brand/5 group-hover:rotate-12 transition-transform duration-1000">
                  <i className="fas fa-music text-[15rem]"></i>
               </div>
               <div className="flex items-center justify-between mb-8 relative z-10">
                 <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-3">
                    <i className="fas fa-compact-disc text-brand"></i> Neural Audio Bed
                 </h3>
                 <select 
                    value={musicGenre}
                    onChange={(e) => setMusicGenre(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-slate-500 outline-none hover:border-brand transition-all shadow-inner"
                 >
                    <option>Cinematic</option>
                    <option>Lo-Fi Focus</option>
                    <option>Strategic Ambience</option>
                    <option>Uplifting Tech</option>
                 </select>
               </div>

               <div className="space-y-8 relative z-10">
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">Automatically generate BGM tracks mapped to the emotional arc of your neural script.</p>
                  
                  {generatedMusicInfo ? (
                    <div className="p-8 bg-slate-950/80 border border-brand/20 rounded-[2rem] animate-fade-in flex items-center justify-between shadow-2xl">
                       <div className="flex items-center gap-6">
                          <button className="w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xl shadow-brand/30">
                             <i className="fas fa-play text-xl"></i>
                          </button>
                          <div>
                             <p className="text-[11px] font-black text-brand uppercase tracking-[0.2em]">{generatedMusicInfo.genre} Synthesis</p>
                             <p className="text-sm font-black text-white uppercase tracking-tight">{generatedMusicInfo.vibe}</p>
                          </div>
                       </div>
                       <button onClick={() => setGeneratedMusicInfo(null)} className="w-10 h-10 rounded-xl bg-white/5 text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 transition-all">
                          <i className="fas fa-times"></i>
                       </button>
                    </div>
                  ) : (
                    <button 
                      onClick={handleGenerateMusic}
                      disabled={isGeneratingMusic || !script}
                      className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-4 ${isGeneratingMusic ? 'bg-slate-800 text-slate-500' : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand/40 shadow-inner'}`}
                    >
                      {isGeneratingMusic ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-sparkles"></i>}
                      Generate Emotional Audio Bed
                    </button>
                  )}
               </div>
            </div>

            {/* Cloning & Quality Feedback */}
            <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
               <div className="flex items-center justify-between mb-8 relative z-10">
                 <h3 className="text-xs font-black uppercase tracking-widest">Neural Clone Handshake</h3>
                 {isRecording && (
                    <div className="flex items-center gap-3 px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 rounded-full">
                       <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>
                       <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Capturing Signal</span>
                    </div>
                 )}
               </div>

               <div className="h-24 flex items-end gap-1.5 mb-10 relative z-10">
                  {waveform.map((h, i) => (
                    <div key={i} className={`flex-1 rounded-full transition-all duration-100 ${isRecording ? 'bg-brand shadow-[0_0_10px_rgba(219,93,67,0.3)]' : 'bg-slate-800 opacity-20'}`} style={{ height: `${Math.max(8, h)}%` }}></div>
                  ))}
               </div>

               <div className="grid grid-cols-2 gap-6 mb-10 relative z-10">
                  <div className="p-6 bg-slate-950 rounded-3xl border border-white/5 shadow-inner space-y-2">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Signal Clarity</p>
                    <div className="flex items-baseline gap-2">
                       <p className={`text-3xl font-black tracking-tighter ${isRecording ? 'text-emerald-500' : 'text-slate-800'}`}>{isRecording ? clarityScore : '--'}</p>
                       <span className="text-[10px] font-black text-slate-600">%</span>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-950 rounded-3xl border border-white/5 shadow-inner space-y-2">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Sample Status</p>
                    <div className="flex items-center gap-3">
                       <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-emerald-500 animate-pulse' : 'bg-slate-800'}`}></div>
                       <p className={`text-sm font-black uppercase tracking-tight ${isRecording ? 'text-white' : 'text-slate-800'}`}>{getQualityLabel(clarityScore)}</p>
                    </div>
                    {isRecording && <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Actionable: Maintain pitch.</p>}
                  </div>
               </div>

               <button 
                 onClick={() => setIsRecording(!isRecording)}
                 className={`w-full py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-5 relative z-10 ${isRecording ? 'bg-rose-600 text-white shadow-2xl shadow-rose-600/30' : 'bg-white text-slate-950 shadow-xl hover:bg-slate-100'}`}
               >
                 {isRecording ? <><i className="fas fa-stop-circle"></i> Kill Capture</> : <><i className="fas fa-microphone-lines"></i> Initialize Clone Node</>}
               </button>
            </div>
          </div>

          {/* Right Side: Preset Engine & TTS */}
          <div className="space-y-10">
            
            {/* Advanced TTS Generator */}
            <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 shadow-2xl relative group">
              <h3 className="text-xs font-black uppercase tracking-widest mb-10">Neural Broadcast Synthesis</h3>
              <div className="flex gap-4 mb-10">
                <select 
                  value={welcomeVoice}
                  onChange={(e) => setWelcomeVoice(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-xs font-black uppercase outline-none focus:border-brand shadow-inner appearance-none"
                >
                  {voicePresets.map(v => <option key={v.name} value={v.name}>{v.name} Identity</option>)}
                </select>
                <button 
                  onClick={handleGenerateWelcome}
                  disabled={isSynthesizing}
                  className="px-10 py-4 bg-brand text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-brand/20 disabled:opacity-50"
                >
                  {isSynthesizing ? <i className="fas fa-circle-notch fa-spin"></i> : 'Deploy'}
                </button>
              </div>

              {welcomeAudioUrl && (
                <div className="p-6 bg-brand/10 border border-brand/20 rounded-3xl flex items-center justify-between animate-fade-in shadow-2xl">
                  <div className="flex items-center gap-5">
                    <button onClick={() => new Audio(welcomeAudioUrl).play()} className="w-12 h-12 rounded-2xl bg-brand text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                      <i className="fas fa-play"></i>
                    </button>
                    <div>
                       <p className="text-[10px] font-black uppercase text-brand tracking-widest">Active_Node_Buffer.wav</p>
                       <p className="text-[8px] font-bold text-slate-500 uppercase mt-0.5">High Dynamic Range • {outputLanguage}</p>
                    </div>
                  </div>
                  <a href={welcomeAudioUrl} download="welcome_audio.wav" className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-600 hover:text-white transition-all">
                    <i className="fas fa-download text-xs"></i>
                  </a>
                </div>
              )}
            </div>

            {/* Neural Identities Console */}
            <div className="bg-slate-900 border border-slate-800 rounded-[4rem] p-10 shadow-2xl relative">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                <div>
                   <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-4">
                     <i className="fas fa-dna text-brand"></i> Identities
                   </h3>
                   <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600 mt-1">Strategic Vocal Repository</p>
                </div>
                <div className="flex gap-4">
                  <select 
                    value={filterTag} 
                    onChange={(e) => setFilterTag(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-5 py-2.5 text-[10px] font-black uppercase text-slate-500 outline-none hover:border-brand transition-all shadow-inner"
                  >
                    {allTags.map(tag => <option key={tag} value={tag}>{tag} Protocol</option>)}
                  </select>
                  <select 
                    value={sortOption} 
                    onChange={(e) => setSortOption(e.target.value as any)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-5 py-2.5 text-[10px] font-black uppercase text-slate-500 outline-none hover:border-brand transition-all shadow-inner"
                  >
                    <option value="name">Alpha Sort</option>
                    <option value="date">Sync Date</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-3 custom-scrollbar">
                {processedPresets.map(v => (
                  <div 
                    key={v.id} 
                    className={`p-8 border transition-all flex items-center justify-between group/v rounded-[2.5rem] relative overflow-hidden ${activePresetId === v.id ? 'bg-brand/5 border-brand shadow-2xl shadow-brand/10' : 'bg-slate-950 border-slate-800 hover:border-brand/40'}`}
                  >
                     <div className="flex items-center gap-6 relative z-10">
                        <button 
                          onClick={() => handleAudition(v.name, v.id)}
                          disabled={isSynthesizing}
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isSynthesizing && activePresetId === v.id ? 'bg-slate-900 text-slate-700' : 'bg-brand/10 text-brand border border-brand/20 group-hover/v:bg-brand group-hover/v:text-white group-hover/v:shadow-glow'}`}
                        >
                           <i className={`fas ${isSynthesizing && activePresetId === v.id ? 'fa-circle-notch fa-spin' : 'fa-volume-high'} text-xl`}></i>
                        </button>
                        <div>
                          <div className="flex items-center gap-4 mb-2">
                            <h4 className="text-lg font-black tracking-tight">{v.name}</h4>
                            {v.isFavorite && <i className="fas fa-star text-[10px] text-amber-500"></i>}
                            {activePresetId === v.id && (
                              <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[8px] font-black uppercase tracking-widest animate-pulse">Online</span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {v.tags.map(tag => (
                              <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 text-[8px] font-black uppercase tracking-widest text-slate-500 border border-white/5 group-hover/v:border-brand/20 group-hover/v:text-slate-300 transition-colors">{tag}</span>
                            ))}
                          </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-3 opacity-0 group-hover/v:opacity-100 transition-all translate-x-4 group-hover/v:translate-x-0 relative z-10">
                        <button onClick={() => toggleFavorite(v.id)} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${v.isFavorite ? 'text-amber-500 bg-amber-500/10 border border-amber-500/20' : 'text-slate-700 bg-slate-900 border border-slate-800 hover:text-white'}`}>
                            <i className="fas fa-star text-sm"></i>
                        </button>
                        <button onClick={() => removePreset(v.id)} className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all">
                            <i className="fas fa-trash-alt text-sm"></i>
                        </button>
                     </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-10 border-t border-slate-800 flex justify-between items-center">
                 <div className="space-y-1">
                   <p className="text-4xl font-black text-brand leading-none">{voicePresets.length}</p>
                   <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Validated Identifiers</p>
                 </div>
                 
                 {showClearConfirm ? (
                   <div className="flex gap-3 animate-fade-in">
                     <button onClick={clearAllPresets} className="px-6 py-3 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase shadow-2xl hover:brightness-110 active:scale-95 transition-all">Confirm Wipe</button>
                     <button onClick={() => setShowClearConfirm(false)} className="px-6 py-3 bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase hover:bg-slate-700 transition-all">Cancel</button>
                   </div>
                 ) : (
                   <button 
                     onClick={() => setShowClearConfirm(true)}
                     className="px-8 py-4 bg-slate-950 border border-slate-800 hover:bg-rose-600/10 hover:text-rose-500 hover:border-rose-500/30 text-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-inner"
                   >
                     Wipe Local Data
                   </button>
                 )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Deployment Footer */}
      <section className="py-24 bg-brand relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10 relative z-10">
          <h2 className="text-6xl font-black text-white tracking-tighter leading-none">Global Identity Sync.</h2>
          <p className="text-xl text-white/80 font-bold uppercase tracking-widest max-w-2xl mx-auto">Commit identities to our high-fidelity nodes in <span className="underline decoration-white/30 underline-offset-8">220+ territories</span> with zero downtime.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
            <button className="px-16 py-7 bg-slate-950 text-white rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-black/40">Sync Engine</button>
            <button className="px-16 py-7 bg-white text-brand rounded-[2rem] font-black text-xl hover:bg-slate-50 transition-all shadow-2xl shadow-black/20">Monitor Health</button>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      </section>

    </div>
  );
};

export default VoiceAgentsService;
