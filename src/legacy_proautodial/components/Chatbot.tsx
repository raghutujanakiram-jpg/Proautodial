
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiProResponse } from '../services/geminiService';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getGeminiProResponse(`You are the ProAutoDial Strategic Assistant. Help the user with: ${userMsg}. Keep your style enterprise-professional but punchy.`);
      setMessages(prev => [...prev, { role: 'model', text: response || 'Strategic timeout. Please retry.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Intelligence link severed.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100] font-sans">
      {isOpen ? (
        <div className="w-[420px] h-[650px] bg-white dark:bg-slate-900 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden animate-fade-in-up">
          <div className="bg-slate-950 p-8 text-white flex justify-between items-center relative">
            <div className="absolute inset-0 bg-brand/10 pointer-events-none"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(219,93,67,0.4)]">
                <i className="fas fa-robot text-xl"></i>
              </div>
              <div>
                <span className="font-black text-sm uppercase tracking-widest block">Strategic AI</span>
                <span className="text-[10px] text-green-400 flex items-center gap-1.5 font-black uppercase">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span> Gemini 3 Pro Engine
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50 dark:bg-slate-950 shadow-inner custom-scrollbar">
            {messages.length === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-brand/10 text-brand rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-brand/20">
                   <i className="fas fa-sparkles text-2xl"></i>
                </div>
                <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600 tracking-[0.3em] mb-4">Autonomous Assistant</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Inquire about our enterprise capabilities.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[85%] rounded-[1.5rem] px-5 py-4 text-sm font-semibold shadow-sm transition-all ${m.role === 'user' ? 'bg-brand text-white shadow-brand/20' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 rounded-2xl px-5 py-3 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <div className="p-8 bg-white dark:bg-slate-900 flex gap-3 border-t dark:border-slate-800">
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-brand/10 outline-none transition-all dark:text-white"
            />
            <button 
              onClick={handleSend}
              className="w-14 h-14 bg-brand text-white rounded-2xl flex items-center justify-center hover:brightness-110 transition-all shadow-xl shadow-brand/20 active:scale-95"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-20 h-20 bg-brand text-white rounded-[2rem] shadow-[0_20px_50px_rgba(219,93,67,0.4)] hover:scale-110 transition-all flex items-center justify-center group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <i className="fas fa-comment-dots text-4xl relative z-10 group-hover:rotate-12 transition-transform"></i>
          <span className="absolute top-4 right-4 w-4 h-4 bg-white rounded-full animate-ping z-20"></span>
        </button>
      )}
    </div>
  );
};

export default Chatbot;
