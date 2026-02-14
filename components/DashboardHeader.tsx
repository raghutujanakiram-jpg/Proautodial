
import React, { useState } from 'react';
import { AppView, UserProfile, Notification } from '../types';

interface DashboardHeaderProps {
  onNavigate: (view: AppView) => void;
  user: UserProfile;
  notifications: Notification[];
  onClearNotifications: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onNavigate, user, notifications, onClearNotifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl px-10 flex items-center justify-between sticky top-0 z-[100] transition-all">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl relative group">
        <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand transition-colors"></i>
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Global Command Search (Campaigns, Agents, Leads...)"
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-6 py-3 text-xs font-bold text-white outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/5 transition-all"
        />
        {searchQuery && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 animate-fade-in z-[110]">
             <p className="text-[10px] font-black uppercase text-slate-500 mb-4 px-2">Recent Results</p>
             <div className="space-y-1">
               <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 flex items-center gap-3 transition-all">
                 <i className="fas fa-bullhorn text-brand text-xs"></i>
                 <span className="text-xs font-bold">Search results for "{searchQuery}" in Campaigns</span>
               </button>
               <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 flex items-center gap-3 transition-all">
                 <i className="fas fa-users text-blue-500 text-xs"></i>
                 <span className="text-xs font-bold">Search results for "{searchQuery}" in Contacts</span>
               </button>
             </div>
          </div>
        )}
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-6 ml-8">
        {/* Notification Bell */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-brand hover:border-brand/30 transition-all relative group"
            title="System Notifications"
          >
            <i className={`fas fa-bell text-lg ${unreadCount > 0 ? 'animate-swing' : ''}`}></i>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-slate-950">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute top-full right-0 mt-4 w-96 bg-slate-900 border border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden animate-fade-in-up">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
                <h3 className="text-sm font-black uppercase tracking-widest">Neural Alerts</h3>
                <button onClick={onClearNotifications} className="text-[10px] font-black text-slate-500 hover:text-brand uppercase">Clear All</button>
              </div>
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-4 space-y-2">
                {notifications.length > 0 ? notifications.map(n => (
                  <div key={n.id} className={`p-4 rounded-2xl flex gap-4 transition-all ${n.read ? 'opacity-50' : 'bg-white/5 border border-white/5'}`}>
                    <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-lg ${n.type === 'success' ? 'text-emerald-500 bg-emerald-500/10' : n.type === 'warning' ? 'text-amber-500 bg-amber-500/10' : 'text-blue-500 bg-blue-500/10'}`}>
                      <i className={`fas ${n.type === 'success' ? 'fa-check-circle' : n.type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-info'}`}></i>
                    </div>
                    <div>
                      <h4 className="text-xs font-black">{n.title}</h4>
                      <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-1">{n.message}</p>
                      <span className="text-[8px] font-bold text-slate-600 uppercase mt-2 block">{n.timestamp}</span>
                    </div>
                  </div>
                )) : (
                  <div className="py-12 text-center space-y-4">
                     <i className="fas fa-bell-slash text-4xl text-slate-800"></i>
                     <p className="text-xs font-bold text-slate-600 uppercase">Silence is Golden</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Access */}
        <button 
          onClick={() => onNavigate(AppView.PROFILE)}
          className="flex items-center gap-4 pl-6 border-l border-slate-800 group"
          title="Account Settings"
        >
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-white group-hover:text-brand transition-colors uppercase tracking-tighter">{user.name}</p>
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{user.timezone}</p>
          </div>
          <div className="relative">
            <img src={user.avatar} className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-800 group-hover:border-brand transition-all" alt="Profile" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950"></div>
          </div>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
