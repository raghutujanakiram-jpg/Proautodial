
import React, { useState } from 'react';
import { generateDemoConfirmation } from '../services/geminiService';
import AIImage from './AIImage';

const BookDemo: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', objective: '', company: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [aiFeedback, setAiFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.objective) {
      alert("Strategic identity and objectives are required for booking.");
      return;
    }

    setStatus('submitting');
    try {
      const feedback = await generateDemoConfirmation(formData.name, formData.objective);
      setAiFeedback(feedback || 'Neural slot secured. Awaiting engineering sync.');
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  const timeSlots = [
    "09:00 AM EST", "11:30 AM EST", "02:00 PM EST", "04:30 PM EST"
  ];

  return (
    <section id="book-demo" className="py-40 px-4 bg-white dark:bg-[#0B0E14] relative overflow-hidden transition-colors duration-500">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          
          <div className="space-y-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-brand/10 text-brand font-black text-xs uppercase tracking-[0.3em] border border-brand/20">
              <span className="w-2 h-2 bg-brand rounded-full animate-ping"></span>
              Neural Scheduling Live
            </div>
            
            <h2 className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
              Witness the <br />
              <span className="text-gradient italic">Neural Edge.</span>
            </h2>
            
            <p className="text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Book a 1:1 strategic briefing. We'll demonstrate how our Gemini-powered architecture can specifically solve your unique operational constraints.
            </p>

            <ul className="space-y-6">
              {[
                { text: 'Custom POC built for your industry', icon: 'fa-microchip-ai' },
                { text: 'Carrier-grade latency live test', icon: 'fa-tower-cell' },
                { text: 'Full ROI architecture projection', icon: 'fa-chart-mixed' }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-brand transition-transform group-hover:scale-110 shadow-sm">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="p-8 glass rounded-[2.5rem] border-brand/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                 <i className="fas fa-quote-right text-6xl"></i>
               </div>
               <p className="text-lg italic text-slate-700 dark:text-slate-300 font-semibold leading-relaxed relative z-10">
                 "The demo was enough to convince our C-suite. The level of neural responsiveness is unlike anything we've seen in the legacy VoIP space."
               </p>
               <div className="mt-6 flex items-center gap-4 relative z-10">
                 <img src="https://i.pravatar.cc/100?u=cxo" className="w-12 h-12 rounded-xl object-cover" alt="Reviewer" />
                 <div>
                   <p className="text-sm font-black dark:text-white">David Chen</p>
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">VP Engineering @ CloudScale</p>
                 </div>
               </div>
            </div>
          </div>

          <div className="relative animate-fade-in">
             <div className="absolute -inset-6 bg-brand/10 rounded-[4rem] blur-3xl opacity-50"></div>
             
             {status === 'success' ? (
                <div className="relative bg-white dark:bg-slate-900 rounded-[3.5rem] p-16 shadow-2xl border border-slate-100 dark:border-slate-800 text-center space-y-8">
                  <div className="w-24 h-24 bg-brand rounded-3xl flex items-center justify-center text-white mx-auto shadow-xl shadow-brand/20 animate-float">
                    <i className="fas fa-calendar-circle-check text-4xl"></i>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">Neural Slot Locked</h3>
                    <p className="text-slate-500 font-medium">Gemini has analyzed your objectives and provided this confirmation:</p>
                  </div>
                  <div className="p-8 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-brand/20 text-left relative overflow-hidden">
                    <div className="absolute left-0 top-0 w-1 h-full bg-brand"></div>
                    <span className="text-[10px] font-black text-brand uppercase tracking-widest mb-2 block">AI Synthesis Feedback</span>
                    <p className="text-slate-700 dark:text-slate-300 italic font-semibold leading-relaxed">"{aiFeedback}"</p>
                  </div>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-brand font-black text-xs uppercase tracking-widest hover:underline"
                  >
                    Edit Strategic Profile
                  </button>
                </div>
             ) : (
                <form onSubmit={handleSubmit} className="relative bg-white dark:bg-slate-950 rounded-[3.5rem] p-12 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-8">
                   <div className="space-y-2">
                     <h3 className="text-2xl font-black text-slate-900 dark:text-white">Secure your briefing</h3>
                     <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Available Slots for next 48 Hours</p>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     {timeSlots.map((slot) => (
                       <button 
                        key={slot}
                        type="button"
                        className="py-4 px-2 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest hover:border-brand hover:text-brand transition-all"
                       >
                         {slot}
                       </button>
                     ))}
                   </div>

                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Strategic Lead</label>
                        <input 
                          type="text"
                          placeholder="Full Name"
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-brand/10 transition-all font-bold dark:text-white"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Enterprise Email</label>
                        <input 
                          type="email"
                          placeholder="name@company.com"
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-brand/10 transition-all font-bold dark:text-white"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Demo Objective</label>
                        <textarea 
                          placeholder="What specific challenge should we demonstrate?"
                          className="w-full h-32 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-brand/10 transition-all font-bold dark:text-white resize-none"
                          value={formData.objective}
                          onChange={(e) => setFormData({...formData, objective: e.target.value})}
                        />
                      </div>
                   </div>

                   <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-6 bg-brand text-white rounded-2xl font-black text-xl hover:brightness-110 shadow-xl shadow-brand/30 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4"
                   >
                     {status === 'submitting' ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-rocket-launch"></i>}
                     Commit to Briefing
                   </button>
                </form>
             )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDemo;
