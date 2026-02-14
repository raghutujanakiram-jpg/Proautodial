
import React from 'react';

const SolutionsSection: React.FC = () => {
  const solutions = [
    {
      title: 'Inbound Cognitive Support',
      description: 'Zero-latency call classification with automated empathetic responses.',
      icon: 'fa-headset',
      bullets: ['Emotion Detection', 'Automated Ticketing', 'Instant Routing', 'Live Sentiment']
    },
    {
      title: 'Outbound Predictive Engine',
      description: 'Scale outreach infinitely with high-fidelity predictive algorithms.',
      icon: 'fa-rocket-launch',
      bullets: ['Predictive Dialing', 'Lead Scoring', 'Compliance Guard', 'CRM Integration']
    },
    {
      title: 'AI Coaching Hub',
      description: 'Empower agents with real-time neural prompts and live coaching.',
      icon: 'fa-user-astronaut',
      bullets: ['Live Transcripts', 'Objection Handling', 'Agent Scorecards', 'Skill Gap Intel']
    },
    {
      title: 'Seamless Appointment Suite',
      description: 'Eliminate booking friction with automated neural scheduling.',
      icon: 'fa-calendar-star',
      bullets: ['One-click Booking', 'Auto-Reminders', 'Conflict Resolution', 'Global Timezone Sync']
    },
    {
      title: 'Enterprise Helpdesk V4',
      description: 'Robust support lifecycle management for high-demand environments.',
      icon: 'fa-microchip-ai',
      bullets: ['Level 1 Automation', 'Seamless Escalate', 'SLA Pulse Monitor', 'History Search']
    },
    {
      title: 'Omni-Channel Flow',
      description: 'A unified strategic interface for voice, chat, and bulk outreach.',
      icon: 'fa-layer-group',
      bullets: ['Unified Queue', 'Platform Mobility', 'Cloud Archive', 'Strategic Reports']
    }
  ];

  return (
    <section id="solutions" className="py-40 bg-slate-50 dark:bg-[#0B0E14] transition-all duration-500 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-32 space-y-8 relative z-10 animate-fade-in-up">
          <h2 className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
            Total <span className="text-gradient italic">Synergy.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-3xl mx-auto text-2xl font-medium leading-relaxed">
            Everything you need to orchestrate the world's most sophisticated communication hub.
          </p>
          <div className="w-32 h-2 bg-brand mx-auto rounded-full shadow-lg shadow-brand/40"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {solutions.map((item, idx) => (
            <div key={idx} className="group glass rounded-[3rem] p-12 shadow-sm transition-all duration-700 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] hover:-translate-y-4 relative overflow-hidden border border-slate-200/50 dark:border-slate-800/50">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand/5 rounded-full -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-1000"></div>
              
              <div className="w-20 h-20 bg-brand/10 rounded-3xl flex items-center justify-center text-brand mb-10 transition-all group-hover:rotate-12 group-hover:scale-110 shadow-sm border border-brand/20 glossy-glow">
                <i className={`fas ${item.icon} text-3xl`}></i>
              </div>
              
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6 group-hover:text-brand transition-colors">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-10 text-base font-medium leading-relaxed">
                {item.description}
              </p>
              
              <ul className="space-y-5 text-sm text-slate-700 dark:text-slate-300">
                {item.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-center gap-4 font-bold">
                    <div className="w-2 h-2 bg-brand rounded-full shadow-[0_0_8px_rgba(219,93,67,1)]"></div>
                    {bullet}
                  </li>
                ))}
              </ul>
              
              <div className="mt-12 pt-10 border-t border-slate-200/50 dark:border-slate-800/50">
                <button className="text-brand font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 group/btn hover:gap-6 transition-all">
                  Deep Dive <i className="fas fa-arrow-right-long text-sm transition-transform group-hover/btn:scale-x-125"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
