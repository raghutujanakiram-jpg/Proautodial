
import React from 'react';
import { AppView, UserProfile } from '../types';
import Logo from '../Logo';

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  user: UserProfile;
}

const DashboardSidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, user }) => {
  const primaryGroups = [
    {
      label: 'Intelligence',
      items: [
        { view: AppView.HUB, icon: 'fa-house-chimney-window', label: 'Command Hub' },
        { view: AppView.VOICE_LAB, icon: 'fa-microchip-ai', label: 'Neural Lab' },
      ]
    },
    {
      label: 'Operations',
      items: [
        { view: AppView.AGENT_DESKTOP, icon: 'fa-headset', label: 'Live Desk' },
        { view: AppView.CAMPAIGNS, icon: 'fa-bullhorn', label: 'Outreach' },
        { view: AppView.KNOWLEDGE_BASE, icon: 'fa-brain-circuit', label: 'Knowledge' },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-900 flex flex-col h-screen flex-shrink-0 z-[110] transition-all">
      <div className="p-8 flex justify-center">
        <button onClick={() => onNavigate(AppView.LANDING)} className="hover:scale-105 transition-transform">
          <Logo size="sm" showText={false} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-10 custom-scrollbar">
        {primaryGroups.map((group, gIdx) => (
          <nav key={gIdx} className="space-y-1">
            <p className="px-4 text-[10px] font-black uppercase text-slate-600 tracking-[0.3em] mb-4">{group.label}</p>
            {group.items.map((item) => (
              <button
                key={item.view}
                onClick={() => onNavigate(item.view)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all group relative ${
                  currentView === item.view 
                    ? 'bg-brand text-white shadow-lg shadow-brand/20' 
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <i className={`fas ${item.icon} text-lg w-6 text-center transition-transform group-hover:scale-110`}></i>
                {item.label}
              </button>
            ))}
          </nav>
        ))}
      </div>

      <div className="p-6 border-t border-slate-900 space-y-4">
        <button 
          onClick={() => onNavigate(AppView.PROFILE)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all border border-transparent ${currentView === AppView.PROFILE ? 'bg-white/5 border-white/10 ring-1 ring-white/10' : 'hover:bg-white/5'}`}
        >
          <img src={user.avatar} className="w-8 h-8 rounded-xl object-cover border border-slate-800" alt="Profile" />
          <div className="flex-1 overflow-hidden text-left">
            <p className="text-[10px] font-black text-white truncate uppercase">{user.name.split(' ')[0]}</p>
            <p className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">System Access</p>
          </div>
          <i className="fas fa-cog text-slate-700 text-xs"></i>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
