
import React, { useState } from 'react';
import { AppView } from '../types';

interface CustomerLoginProps {
  onNavigate?: (view: AppView) => void;
}

const CustomerLogin: React.FC<CustomerLoginProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      if (formData.email === 'customer@proautodial.com' && formData.password === 'customer123') {
        setStatus('success');
        // Redirect to Customer Dashboard (using PORTAL_DASHBOARD for now)
        if (onNavigate) {
            onNavigate(AppView.PORTAL_DASHBOARD);
        }
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-500">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[140px] pointer-events-none"></div>
      
      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Customer <span className="text-brand">Hub</span></h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your campaigns and agents</p>
        </div>

        <div className="glass dark:bg-slate-900/40 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-800/50 relative overflow-hidden">
          
          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm font-bold text-center animate-fade-in">
              Invalid credentials. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">Email Address</label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input 
                  type="email"
                  placeholder="user@company.com"
                  className={`w-full bg-white dark:bg-slate-900 border rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-4 transition-all font-bold shadow-sm ${errors.email ? 'border-brand ring-brand/10' : 'border-slate-200 dark:border-slate-800 focus:ring-brand/10'}`}
                  value={formData.email}
                  onChange={e => {
                    setFormData({...formData, email: e.target.value});
                    if (errors.email) setErrors({...errors, email: ''});
                  }}
                />
              </div>
              {errors.email && <p className="text-[10px] text-brand font-black uppercase tracking-widest ml-2 animate-fade-in">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">Password</label>
              <div className="relative">
                <i className="fas fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input 
                  type="password"
                  placeholder="••••••••"
                  className={`w-full bg-white dark:bg-slate-900 border rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-4 transition-all font-bold shadow-sm ${errors.password ? 'border-brand ring-brand/10' : 'border-slate-200 dark:border-slate-800 focus:ring-brand/10'}`}
                  value={formData.password}
                  onChange={e => {
                    setFormData({...formData, password: e.target.value});
                    if (errors.password) setErrors({...errors, password: ''});
                  }}
                />
              </div>
              {errors.password && <p className="text-[10px] text-brand font-black uppercase tracking-widest ml-2 animate-fade-in">{errors.password}</p>}
            </div>

            <button 
              type="submit"
              disabled={status === 'submitting' || status === 'success'}
              className="w-full py-4 bg-brand text-white rounded-2xl font-black text-lg hover:brightness-110 transition-all shadow-lg shadow-brand/30 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98] mt-4"
            >
              {status === 'submitting' ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-arrow-right"></i>}
              {status === 'success' ? 'Authenticated' : 'Login to Account'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              System Administrator?{' '}
              <button 
                onClick={() => onNavigate && onNavigate(AppView.ADMIN_LOGIN)}
                className="text-brand font-bold hover:underline"
              >
                Admin Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerLogin;
