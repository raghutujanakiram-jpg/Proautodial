
import React, { useState } from 'react';
import { processContactSubmission } from '../services/geminiService';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', type: 'General Inquiry', msg: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    await processContactSubmission(form.name, form.msg);
    setStatus('success');
  };

  return (
    <div className="pt-40 pb-32 px-6 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 animate-fade-in">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-6xl font-black tracking-tighter dark:text-white">Contact <br /><span className="text-brand">Architecture.</span></h1>
            <p className="text-xl text-slate-500 font-medium">Global support and strategic sales inquiries.</p>
          </div>

          <div className="space-y-8">
             <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center flex-shrink-0 shadow-sm"><i className="fas fa-location-dot"></i></div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">HQ Office</p>
                   <p className="font-bold dark:text-white">Hyderabad, Telangana, India</p>
                </div>
             </div>
             <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center flex-shrink-0 shadow-sm"><i className="fas fa-phone-volume"></i></div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Global Hotline</p>
                   <p className="text-xl font-black text-brand hover:underline cursor-pointer">+91 8898 7 24 365</p>
                </div>
             </div>
          </div>
        </div>

        {status === 'success' ? (
           <div className="bg-white dark:bg-slate-900 p-16 rounded-[4rem] border border-slate-100 dark:border-slate-800 text-center space-y-8 shadow-2xl">
              <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl animate-bounce"><i className="fas fa-check text-4xl"></i></div>
              <h3 className="text-3xl font-black dark:text-white">Link Synchronized.</h3>
              <p className="text-slate-500 font-medium">Our strategic team has received your inquiry. A response is being computed.</p>
              <button onClick={() => setStatus('idle')} className="text-brand font-black uppercase text-xs tracking-widest hover:underline">New Inquiry</button>
           </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-12 rounded-[4rem] border border-slate-100 dark:border-slate-800 space-y-8 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Lead Identity</label>
                 <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-brand/10 transition-all font-bold" placeholder="Full Name" />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Endpoint</label>
                 <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-brand/10 transition-all font-bold" placeholder="Email Address" />
              </div>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Inquiry Node</label>
               <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-brand/10 transition-all font-bold appearance-none">
                  <option>General Inquiry</option>
                  <option>Sales Inquiry</option>
                  <option>Support Request</option>
                  <option>Partnership</option>
                  <option>Migration (FREE)</option>
               </select>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Inquiry Payload</label>
               <textarea required value={form.msg} onChange={e => setForm({...form, msg: e.target.value})} className="w-full h-40 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-brand/10 transition-all font-bold resize-none" placeholder="Describe your operational goals..." />
            </div>
            <button disabled={status === 'loading'} className="w-full py-6 bg-brand text-white rounded-[2rem] font-black uppercase text-sm tracking-widest shadow-2xl shadow-brand/20 hover:brightness-110 active:scale-95 transition-all">
              {status === 'loading' ? <i className="fas fa-spinner fa-spin"></i> : 'Transmit Signal'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
