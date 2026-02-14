
import React, { useState } from 'react';
import { AppView } from '../types';

interface AdminLoginProps {
  onNavigate?: (view: AppView) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onNavigate }) => {
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
      if (formData.email === 'admin@proautodial.com' && formData.password === 'admin123') {
        setStatus('success');
        // In a real app, you would store the token and redirect
        // For now, we can redirect to the Dashboard if onNavigate is provided
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
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[140px] pointer-events-none"></div>
      
      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Admin <span className="text-brand">Portal</span></h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Secure access for system administrators</p>
        </div>

        <div className="glass dark:bg-slate-900/40 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-800/50 relative overflow-hidden">
          
          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm font-bold text-center animate-fade-in">
              Invalid credentials. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">Admin Email</label>
              <div className="relative">
                <i className="fas fa-shield-halved absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input 
                  type="email"
                  placeholder="admin@proautodial.com"
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
              {status === 'submitting' ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-right-to-bracket"></i>}
              {status === 'success' ? 'Authenticated' : 'Access Dashboard'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Not an admin?{' '}
              <button 
                onClick={() => onNavigate && onNavigate(AppView.CUSTOMER_LOGIN)}
                className="text-brand font-bold hover:underline"
              >
                Customer Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
