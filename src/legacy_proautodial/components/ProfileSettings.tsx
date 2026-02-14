
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfileSettingsProps {
  profile: UserProfile;
  onSave: (p: UserProfile) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ profile, onSave }) => {
  const [localProfile, setLocalProfile] = useState<UserProfile>(profile);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onSave(localProfile);
      setIsSaving(false);
      alert('Profile Strategy Updated Successfully.');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tighter">Strategic <span className="text-brand">Identity</span></h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Personalize your command presence</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Avatar Section */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative group">
              <div className="absolute -inset-4 bg-brand/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img src={localProfile.avatar} className="w-48 h-48 rounded-[3rem] object-cover border-4 border-slate-800 group-hover:border-brand transition-all relative z-10" alt="Avatar" />
              <button className="absolute bottom-4 right-4 w-12 h-12 bg-brand text-white rounded-2xl flex items-center justify-center shadow-2xl z-20 hover:scale-110 transition-transform">
                <i className="fas fa-camera"></i>
              </button>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black">{localProfile.name}</h3>
              <p className="text-xs text-slate-500 font-medium">{localProfile.email}</p>
            </div>
          </div>

          {/* Settings Section */}
          <div className="lg:col-span-2 space-y-8 bg-slate-900 border border-slate-800 p-10 rounded-[3rem]">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Display Handle</label>
                <input 
                  type="text"
                  value={localProfile.name}
                  onChange={(e) => setLocalProfile({...localProfile, name: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold focus:border-brand outline-none transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Operational Language</label>
                <select 
                  value={localProfile.language}
                  onChange={(e) => setLocalProfile({...localProfile, language: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold focus:border-brand outline-none transition-all appearance-none"
                >
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Spanish (ES)</option>
                  <option>Hindi (IN)</option>
                  <option>Arabic (UAE)</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Timezone Synchronization</label>
                <select 
                  value={localProfile.timezone}
                  onChange={(e) => setLocalProfile({...localProfile, timezone: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold focus:border-brand outline-none transition-all appearance-none"
                >
                  <option>UTC+5:30 (IST)</option>
                  <option>UTC-8:00 (PST)</option>
                  <option>UTC+0:00 (GMT)</option>
                  <option>UTC+4:00 (GST)</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Login Credentials</label>
                <button className="w-full py-4 bg-slate-800 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-700 transition-all">Update Strategy Key</button>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800 flex justify-end">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="px-12 py-5 bg-brand text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-brand/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-3"
              >
                {isSaving ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-shield-check"></i>}
                Commit Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
