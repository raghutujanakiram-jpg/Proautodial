
import React, { useState } from 'react';
import { AppView } from '../types';
import Logo from '../Logo';

interface NavigationProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  isDarkMode: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const mainLinks = [
    { label: 'Home', view: AppView.HOME },
    { label: 'Solutions', view: AppView.SOLUTIONS, mega: true },
    { label: 'AI Voice Agents', view: AppView.AI_VOICE_AGENTS },
    { label: 'Case Studies', view: AppView.CASE_STUDIES },
    { label: 'Blog', view: AppView.BLOG },
    { label: 'Support', view: AppView.SUPPORT_CENTER },
    { label: 'Pricing', view: AppView.PRICING },
  ];

  const solutionsMega = [
    { label: 'Virtual Phone System', view: AppView.VIRTUAL_PHONE_SYSTEM, icon: 'fa-phone-volume' },
    { label: 'Predictive Dialer', view: AppView.PREDICTIVE_DIALER, icon: 'fa-bolt' },
    { label: 'Call Center Solution', view: AppView.VIRTUAL_CALL_CENTER, icon: 'fa-headset' },
    { label: 'Voice Broadcasting', view: AppView.VOICE_BROADCASTING, icon: 'fa-bullhorn' },
    { label: 'Auto Dialer', view: AppView.AUTO_DIALER, icon: 'fa-robot' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-24 flex items-center bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-slate-200 dark:border-slate-800 border-b z-[300] transition-all duration-500 px-6">
      <div className="max-w-[1600px] mx-auto w-full flex items-center justify-between">
        <div 
          className="cursor-pointer group flex items-center"
          onClick={() => onNavigate(AppView.HOME)}
        >
          <Logo size="sm" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {mainLinks.map(link => (
            <div 
              key={link.label} 
              className="relative py-8"
              onMouseEnter={() => link.mega && setActiveMegaMenu('solutions')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button 
                onClick={() => onNavigate(link.view)}
                className={`text-[10px] font-black tracking-widest uppercase transition-all flex items-center gap-2 ${
                  currentView === link.view ? 'text-brand' : 'text-slate-500 dark:text-slate-400 hover:text-brand'
                }`}
              >
                {link.label}
                {link.mega && <i className={`fas fa-chevron-down text-[8px] transition-transform ${activeMegaMenu === 'solutions' ? 'rotate-180' : ''}`}></i>}
              </button>
              
              {link.mega && activeMegaMenu === 'solutions' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl p-10 animate-fade-in-up">
                  <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-4 border-r border-slate-100 dark:border-slate-800 pr-8 space-y-6">
                       {['By Need', 'By Use Case', 'Industry'].map((tab, i) => (
                         <button key={tab} className={`w-full text-left px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-between transition-all ${i === 0 ? 'bg-brand/5 text-brand border border-brand/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                           {tab} <i className="fas fa-arrow-right text-[8px]"></i>
                         </button>
                       ))}
                    </div>
                    <div className="col-span-8 grid grid-cols-2 gap-x-8 gap-y-4">
                       {solutionsMega.map((item) => (
                         <button 
                          key={item.view}
                          onClick={() => { onNavigate(item.view); setActiveMegaMenu(null); }}
                          className="flex items-center gap-5 p-5 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left group"
                         >
                            <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center text-xl shadow-sm group-hover:bg-brand group-hover:text-white transition-all">
                               <i className={`fas ${item.icon}`}></i>
                            </div>
                            <span className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight">{item.label}</span>
                         </button>
                       ))}
                    </div>
                  </div>
                  <div className="mt-10 p-6 bg-slate-900 dark:bg-slate-950 rounded-3xl flex items-center justify-between overflow-hidden relative group/banner">
                    <div className="absolute inset-0 bg-brand opacity-0 group-hover/banner:opacity-10 transition-opacity"></div>
                    <p className="text-sm font-black text-white uppercase tracking-tight relative z-10">Streamlined Communication, Customized for Your Business!</p>
                    <button onClick={() => onNavigate(AppView.CONTACT)} className="px-8 py-3 bg-brand text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl relative z-10 hover:scale-105 transition-all">Book A Demo Today</button>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate(AppView.PORTAL_DASHBOARD)}
              className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand hover:text-white transition-all shadow-lg"
            >
              Sign In
            </button>
            <button 
              onClick={() => onNavigate(AppView.BOOK_DEMO)}
              className="px-6 py-2.5 bg-brand text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-brand/20"
            >
              Try ProAutoDial
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-600 dark:text-slate-300">
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-24 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-8 flex flex-col gap-6 lg:hidden animate-fade-in shadow-2xl overflow-y-auto max-h-[80vh]">
          {mainLinks.map(link => (
            <button 
              key={link.label} 
              onClick={() => { onNavigate(link.view); setIsMenuOpen(false); }}
              className="text-lg font-black uppercase tracking-widest text-left"
            >
              {link.label}
            </button>
          ))}
          <div className="h-px bg-slate-200 dark:bg-slate-800 w-full"></div>
          <button onClick={() => { onNavigate(AppView.PORTAL_DASHBOARD); setIsMenuOpen(false); }} className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest">Sign In</button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
