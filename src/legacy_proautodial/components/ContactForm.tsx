
import React, { useState } from 'react';
import { processContactSubmission } from '../services/geminiService';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [aiFeedback, setAiFeedback] = useState('');

  const validate = () => {
    const newErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Organization name is required';
      isValid = false;
    }

    // Comprehensive business email regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email endpoint is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid business email address';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Project roadmap description is required';
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = 'Please provide more detail (min 10 characters)';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('submitting');
    try {
      const feedback = await processContactSubmission(formData.name, formData.message);
      setAiFeedback(feedback || 'Submission categorized successfully.');
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 px-4 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[140px] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Collaborate with <br/><span className="text-brand">Strategy</span></h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg font-medium">Ready for enterprise-grade dialing? Contact our strategic solutions team.</p>
        </div>

        {status === 'success' ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] p-16 text-center space-y-8 animate-fade-in shadow-2xl shadow-brand/10">
            <div className="w-24 h-24 bg-brand rounded-full flex items-center justify-center text-white mx-auto shadow-[0_15px_40px_rgba(219,93,67,0.4)]">
              <i className="fas fa-envelope-circle-check text-4xl"></i>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">Strategic Link Established</h3>
              <p className="text-slate-500 font-medium">Our AI analyzed your request and provided this preliminary confirmation:</p>
            </div>
            <div className="glass p-8 rounded-3xl border-brand/20 text-left relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-brand"></div>
              <span className="text-[10px] font-black text-brand uppercase tracking-widest mb-3 block">Neural Summary</span>
              <p className="text-slate-700 dark:text-slate-300 italic font-semibold leading-relaxed">"{aiFeedback}"</p>
            </div>
            <button 
              onClick={() => setStatus('idle')}
              className="text-brand font-black text-xs uppercase tracking-widest hover:underline"
            >
              Initiate another inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass dark:bg-slate-900/40 rounded-[3rem] p-10 md:p-16 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.1)] border-slate-100 dark:border-slate-800/50 grid md:grid-cols-2 gap-12 group no-validate">
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">Name or Organization</label>
                <input 
                  type="text"
                  placeholder="Enterprise Inc."
                  className={`w-full bg-white dark:bg-slate-900 border rounded-2xl px-6 py-4 outline-none focus:ring-4 transition-all font-bold shadow-sm ${errors.name ? 'border-brand ring-brand/10' : 'border-slate-200 dark:border-slate-800 focus:ring-brand/10'}`}
                  value={formData.name}
                  onChange={e => {
                    setFormData({...formData, name: e.target.value});
                    if (errors.name) setErrors({...errors, name: ''});
                  }}
                />
                {errors.name && <p className="text-[10px] text-brand font-black uppercase tracking-widest ml-2 animate-fade-in">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">Email Endpoint</label>
                <input 
                  type="email"
                  placeholder="contact@enterprise.com"
                  className={`w-full bg-white dark:bg-slate-900 border rounded-2xl px-6 py-4 outline-none focus:ring-4 transition-all font-bold shadow-sm ${errors.email ? 'border-brand ring-brand/10' : 'border-slate-200 dark:border-slate-800 focus:ring-brand/10'}`}
                  value={formData.email}
                  onChange={e => {
                    setFormData({...formData, email: e.target.value});
                    if (errors.email) setErrors({...errors, email: ''});
                  }}
                />
                {errors.email && <p className="text-[10px] text-brand font-black uppercase tracking-widest ml-2 animate-fade-in">{errors.email}</p>}
              </div>
              <div className="p-8 bg-slate-900 dark:bg-slate-950 rounded-[2rem] text-white space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand/20 rounded-full -mr-12 -mt-12 blur-2xl"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20">
                    <i className="fas fa-headset"></i>
                  </div>
                  <span className="font-black text-sm uppercase tracking-widest">Global Ops</span>
                </div>
                <div className="space-y-4 text-xs font-bold text-slate-400 relative z-10">
                  <p className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><i className="fas fa-phone text-brand"></i> +1 (800) DIAL-PRO</p>
                  <p className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><i className="fas fa-location-dot text-brand"></i> Silicon Valley HQ</p>
                  <p className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><i className="fas fa-globe text-brand"></i> Available 24/7/365</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col h-full space-y-8">
              <div className="flex-1 space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">Project Roadmap</label>
                <textarea 
                  placeholder="Tell us about your requirements..."
                  className={`w-full h-[calc(100%-2.5rem)] bg-white dark:bg-slate-900 border rounded-2xl px-6 py-4 outline-none focus:ring-4 transition-all resize-none min-h-[220px] font-bold shadow-sm ${errors.message ? 'border-brand ring-brand/10' : 'border-slate-200 dark:border-slate-800 focus:ring-brand/10'}`}
                  value={formData.message}
                  onChange={e => {
                    setFormData({...formData, message: e.target.value});
                    if (errors.message) setErrors({...errors, message: ''});
                  }}
                />
                {errors.message && <p className="text-[10px] text-brand font-black uppercase tracking-widest ml-2 animate-fade-in">{errors.message}</p>}
              </div>
              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-5 bg-brand text-white rounded-2xl font-black text-xl hover:brightness-110 transition-all shadow-xl shadow-brand/30 flex items-center justify-center gap-4 disabled:opacity-50 active:scale-[0.98]"
              >
                {status === 'submitting' ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-rocket"></i>}
                Establish Contact
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
