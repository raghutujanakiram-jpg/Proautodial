
import React from 'react';

const Features: React.FC = () => {
  const features = [
    { title: 'Strategic Consulting', icon: 'fa-user-tie', desc: 'Partner with industry giants who defined modern outbound infrastructure.' },
    { title: 'Neural Tooling', icon: 'fa-brain-circuit', desc: 'Bespoke AI architectures designed for your unique operational KPIs.' },
    { title: 'Carrier Grade', icon: 'fa-tower-cell', desc: 'Tier-1 global infrastructure ensuring 99.99% uptime and HD audio.' },
    { title: 'AI Acceleration', icon: 'fa-microchip', desc: 'Live prompts and intent detection that turn agents into closing machines.' },
  ];

  return (
    <section id="features" className="py-40 px-6 bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-all duration-500 overflow-hidden relative">
      <div className="absolute inset-0 bg-brand/[0.03] dark:bg-brand/[0.01] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-24 space-y-8 animate-fade-in-up">
          <h2 className="text-6xl font-black tracking-tighter leading-none">The <span className="text-brand">Neural</span> Edge.</h2>
          <p className="text-slate-500 dark:text-slate-400 text-2xl font-medium leading-relaxed">
            Engineered for high-stakes environments where every interaction represents a mission-critical opportunity.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((f, i) => (
            <div key={i} className="group p-12 rounded-[3.5rem] glass hover:bg-brand/5 dark:hover:bg-brand/10 transition-all duration-700 hover:-translate-y-4 border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-2xl">
              <div className="w-20 h-20 bg-brand/10 rounded-3xl flex items-center justify-center text-brand mb-10 group-hover:bg-brand group-hover:text-white transition-all duration-700 shadow-sm border border-brand/20">
                <i className={`fas ${f.icon} text-3xl`}></i>
              </div>
              <h3 className="text-2xl font-black mb-5 leading-tight">{f.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
