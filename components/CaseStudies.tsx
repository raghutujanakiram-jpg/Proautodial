
import React from 'react';
import AIImage from './AIImage';

const CaseStudies: React.FC = () => {
  const cases = [
    {
      company: "Cloudscale Logistics",
      industry: "Supply Chain",
      metric: "40% Lead Conversion Boost",
      description: "Implemented neural outbound qualifiers to handle early-stage procurement inquiries.",
      testimonial: "ProAutoDial transformed our sales floor from a manual grind into a strategic command center.",
      author: "Marcus Thorne, COO",
      prompt: "Modern logistics warehouse with high-tech hologram displays, coral lighting accents, cinematic"
    },
    {
      company: "HealthCore Systems",
      industry: "Healthcare",
      metric: "99% Scheduling Accuracy",
      description: "Automated inbound appointment management using empathetic neural voice responses.",
      testimonial: "Our patient satisfaction scores soared as wait times dropped to zero. Truly transformative.",
      author: "Sarah Jenkins, Director of Ops",
      prompt: "Futuristic medical clinic reception, clean minimal design, high-end medical technology, coral accents"
    },
    {
      company: "Aether FinTech",
      industry: "Financial Services",
      metric: "$2.4M Recovered Revenue",
      description: "Proactive payment reminder campaigns using deterministic knowledge bases and polite AI.",
      testimonial: "The ROI was evident within weeks. The AI's tone is indistinguishable from our top agents.",
      author: "Leon Wu, Head of Growth",
      prompt: "High-end corporate financial district at sunset, sleek skyscrapers, tech-integrated office space"
    }
  ];

  return (
    <section className="py-40 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 space-y-8 animate-fade-in-up">
          <h2 className="text-6xl font-black tracking-tighter leading-none">Global <span className="text-brand">Success</span> Stories.</h2>
          <p className="text-slate-500 dark:text-slate-400 text-2xl font-medium max-w-3xl mx-auto">
            See how the world's most innovative companies are leveraging ProAutoDial to scale their operations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {cases.map((c, i) => (
            <div key={i} className="group flex flex-col bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 border border-slate-100 dark:border-slate-800">
              <div className="h-64 relative overflow-hidden">
                <AIImage 
                  prompt={c.prompt} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-brand/10 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-xl text-[10px] font-black uppercase tracking-widest text-brand border border-brand/20">
                   {c.industry}
                </div>
              </div>
              
              <div className="p-10 flex-1 flex flex-col space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">{c.company}</h3>
                  <div className="inline-block px-4 py-2 bg-brand text-white rounded-full text-sm font-black shadow-lg shadow-brand/20">
                    {c.metric}
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-6">
                  <p className="text-slate-700 dark:text-slate-300 italic font-semibold leading-relaxed">
                    "{c.testimonial}"
                  </p>
                  <div>
                    <p className="text-sm font-black text-slate-900 dark:text-white">{c.author}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Strategic Partner</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
