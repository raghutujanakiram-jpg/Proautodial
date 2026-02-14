import React from 'react';
 
const MultiLingualSection: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center px-6">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand/10 text-brand font-black text-[10px] uppercase tracking-widest border border-brand/20">
            <span className="w-2 h-2 bg-brand rounded-full animate-ping"></span>
            100+ Languages
          </div>
          <h3 className="text-4xl font-black tracking-tight dark:text-white">Break the Language Barrier</h3>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Let customers speak naturally in their preferred dialects. Our voice agents support 100+ languages with regional accents and automatic language detection.
          </p>
          <div className="flex gap-3">
            {['🇮🇳','🇱🇰','🇹🇭','🇲🇾','🇵🇭','🇧🇩','🇲🇻','🇲🇺','🇻🇳','🇦🇪','🇸🇦','🇿🇦','🇮🇪'].map(f => (
              <span key={f} className="text-xl">{f}</span>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <h4 className="text-2xl font-black dark:text-white">Align Voice Agent with Brand Personality</h4>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Select tone, gender, and voice depth that match your brand—warm, energetic, or calm. Consistent, on-brand conversations across every interaction.
          </p>
          <div className="flex flex-wrap gap-3">
            {['Warm','Energetic','Calm','Professional','Friendly'].map(t => (
              <span key={t} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-black uppercase tracking-widest">{t}</span>
            ))}
          </div>
          <div className="relative p-6 rounded-3xl bg-gradient-to-br from-brand/10 via-transparent to-slate-100 dark:to-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center">
                <i className="fas fa-wave-square"></i>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tone</p>
                <p className="font-black text-slate-900 dark:text-white">Energetic</p>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-brand/20 blur-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
 
export default MultiLingualSection;
