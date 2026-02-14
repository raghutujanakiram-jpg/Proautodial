
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pt-40 pb-32 px-6 bg-white dark:bg-slate-950 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-32">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
             <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand">The Proautodial Story</h3>
             <h1 className="text-6xl md:text-8xl font-black tracking-tighter dark:text-white leading-[0.9] italic">Empowering <br /> the <br /> <span className="text-gradient not-italic">Community.</span></h1>
             <p className="text-2xl text-slate-500 font-medium leading-relaxed">
               <strong>Proautodial Telephony services pvt ltd</strong> was founded on the principle of bridging robust legacy open-source systems with the next generation of neural AI.
             </p>
          </div>
          <div className="p-12 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[4rem] space-y-8 shadow-2xl">
             <div className="space-y-2">
                <p className="text-[10px] font-black uppercase text-brand tracking-widest">Our Global Mission</p>
                <h4 className="text-3xl font-black dark:text-white leading-tight">To provide the world's most trusted hybrid telephony stack.</h4>
             </div>
             <p className="text-slate-500 font-medium leading-relaxed italic">"We don't just build dialers. We build the architecture of human connection, powered by deterministic AI and a decade of mastery in Vicidial and Asterisk ecosystems."</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { title: '15+ Years', desc: 'Deep-rooted field experience in Vicidial, Goautodial and SIP protocols.' },
            { title: '200+ Personnel', desc: 'Global team of tactical engineers and neural scientists.' },
            { title: '1100+ Nodes', desc: 'Successful project implementations at www.proautodial.in across 220+ territories.' }
          ].map(stat => (
            <div key={stat.title} className="p-12 bg-slate-900 text-white rounded-[3rem] border border-slate-800 space-y-4">
              <h4 className="text-5xl font-black text-brand tracking-tighter">{stat.title}</h4>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
