
import React from 'react';
import AIImage from '../components/AIImage';

interface CaseStudy {
  company: string;
  scenario: string;
  metric: string;
  description: string;
  story: string;
  coordination: string;
  location: string;
  icon: string;
  prompt: string;
  website: string;
  logoUrl: string;
}

const CaseStudiesPage: React.FC = () => {
  const cases: CaseStudy[] = [
    {
      company: "Agarwal Packers & Movers",
      scenario: "24x7 Domestic Command Center",
      metric: "99% Operational Uptime",
      description: "End-to-End domestic call center solution featuring Inbound, Outbound, IVR, OS Ticket, and CRM integration.",
      story: "As our largest long-term deployment, we engineered a high-concurrency node for 70+ agents. Operating 24x7, this architecture handles complex relocation logistics inquiries through a unified hub that synchronizes carrier-grade IVR with deep OS Ticket and CRM workflows.",
      coordination: "Strategized with Mr. Raman (IT-Head) and coordinated daily with Mr. Vinay and admin leads.",
      location: "Ranigunj, Hyderabad",
      icon: "fa-box-open",
      prompt: "High-tech logistics hub with holographic delivery routes, coral and slate theme, cinematic lighting",
      website: "http://www.agarwalpackers.in",
      logoUrl: "https://www.agarwalpackers.in/images/logo.png"
    },
    {
      company: "AplusA IT Services",
      scenario: "International Multi-Node Support",
      metric: "Global Campaign Mastery",
      description: "International call center architecture supporting concurrent USA and UK campaigns across multiple regional hubs.",
      story: "We deployed a robust international solution for diverse campaigns. Despite the hectic multi-location requirements, we maintained peak performance across various teams, fostering a partnership that goes beyond business into deep technical friendship.",
      coordination: "Coordinated requirements and daily scaling challenges with Mr. Arafat Ghori.",
      location: "Neredmet, Begumpet & Ameerpet (Hyderabad)",
      icon: "fa-earth-americas",
      prompt: "Futuristic international operations center with glowing digital maps, vibrant red and yellow accents",
      website: "http://www.aplusait.com",
      logoUrl: "https://ui-avatars.com/api/?name=A+Plus+A&background=DB5D43&color=fff"
    },
    {
      company: "Square India",
      scenario: "Commodities Missed Call API",
      metric: "Real-time Data Push",
      description: "Custom Missed Call Alert logic integrated with live commodity rate APIs for regional trade transparency.",
      story: "In a pioneering regional deployment, we solved the challenge of providing instant commodity rates through a simple missed call. The architecture synchronizes live rate tools with automated SMS/Voice triggers, a first for the Vizianagaram trade node.",
      coordination: "Managed requirements with Mr. Pratap Kolagatla and operational metrics with Ms. Jyothi.",
      location: "Vizianagaram",
      icon: "fa-chart-line-up",
      prompt: "Abstract visualization of stock and commodity rates on a digital grid, glowing orange data lines",
      website: "http://www.squareindia.com",
      logoUrl: "https://www.squareindia.com/assets/logo.png"
    },
    {
      company: "Apna Loan Bazaar",
      scenario: "Financial Outreach Node",
      metric: "Zero-Latency Maintenance",
      description: "Domestic outbound predictive dialer and auto-dialing solution for high-volume loan inquiries.",
      story: "We provide a 6-day support window (9am-5pm) for this financial hub. To ensure zero downtime during business hours, all backup and maintenance sequences are strategically executed on Sundays and post-operational windows.",
      coordination: "Direct technical coordination with Mr. Naveen.",
      location: "Domestic Hub (India)",
      icon: "fa-comments-dollar",
      prompt: "Modern fintech office with glowing loan approval charts, professional financial atmosphere",
      website: "https://www.apnaloanbazaar.com",
      logoUrl: "https://apnaloanbazaar.com/logo.png"
    },
    {
      company: "Best Tax Filer",
      scenario: "USA International Night-Ops",
      metric: "Midnight Support Prowess",
      description: "Installation and optimization of Goautodial open-source suite for international USA tax cycles.",
      story: "Catering exclusively to the USA market, we manage their critical night-shift infrastructure. Our engineering team maintains a 99% uptime with immediate midnight support response to ensure zero disruption during the peak US filing seasons.",
      coordination: "Strategized deployment and performance monitoring with Mr. Harish.",
      location: "International Ops Hub",
      icon: "fa-file-invoice-dollar",
      prompt: "Clean professional accounting office with digital tax forms, midnight blue and coral lighting",
      website: "https://www.besttaxfiler.com/",
      logoUrl: "https://besttaxfiler.com/logo.png"
    },
    {
      company: "Career Doctor",
      scenario: "Counseling Appointment Suite",
      metric: "Deterministic Call Flow",
      description: "Domestic domestic solution featuring predictive dialing and automated inbound counseling routing.",
      story: "Working with business owners and long-term admins, we've built a seamless 6-day support engine. The system manages counselor availability and student callbacks with high precision, ensuring every inquiry is handled within business hours.",
      coordination: "Directly managed with Mr. Ankam Rambabu (Owner) and Mr. Suresh (Admin Lead).",
      location: "Education Hub (India)",
      icon: "fa-user-doctor",
      prompt: "Futuristic education counseling center with glowing career maps, welcoming tech-lite design",
      website: "http://careerdoctor.in",
      logoUrl: "https://careerdoctor.in/logo.png"
    },
    {
      company: "LTW (Leo Tech Wave)",
      scenario: "Multi-City Global Solutions",
      metric: "Cross-Region Neural Link",
      description: "International call center architecture for USA clients spanning multiple high-capacity regional nodes.",
      story: "Building across four major locations, we managed a hectic multi-campaign environment with passion. The architecture bridges international nodes in Hyderabad and Vizag into a single unified telephony fabric.",
      coordination: "Strategized with Mr. Bhanu for requirements and Mr. Sai for day-to-day operations.",
      location: "Begumpet, KPHB, Secunderabad & Visakhapatnam",
      icon: "fa-crown",
      prompt: "High-end corporate office with world map showing glowing multi-city nodes, luxury business aesthetic",
      website: "https://www.linkedin.com/company/leo-tech-wave/",
      logoUrl: "https://ui-avatars.com/api/?name=LTW&background=0B0E14&color=fff"
    },
    {
      company: "PMC - Peace In Every Home",
      scenario: "NGO Inbound Gateway",
      metric: "High-Trust IVR Routing",
      description: "Specialized domestic inbound and IVR solution for Islamic related queries and community NGO support.",
      story: "As a mission-critical support line, we provide a robust inbound node with specialized IVR menus. Operating on a strict 6-day schedule, the system ensures that every query finds its way to the right counselor during business hours.",
      coordination: "Long-term partnership with Mr. Imran for operational requirements and scaling.",
      location: "Boyinpally, Hyderabad",
      icon: "fa-dove",
      prompt: "Peaceful modern NGO center with glowing motifs of guidance and calm, warm lighting",
      website: "#",
      logoUrl: "https://ui-avatars.com/api/?name=PMC&background=334155&color=fff"
    },
    {
      company: "Squircle IT",
      scenario: "Australia Early-Morning Ops",
      metric: "Peak Morning Performance",
      description: "Installation and 24/7 support of Goautodial suite for Australian international campaigns.",
      story: "To align with the Australian timezone, we manage early-morning support cycles. Our Goautodial deployment maintains a 99% uptime, ensuring the outreach nodes are fully operational and optimized for the high-value AU market.",
      coordination: "Coordinated requirements and troubleshooting cycles with Ms. Swapna.",
      location: "International IT Corridor",
      icon: "fa-code-merge",
      prompt: "Modern tech consulting lab with neon code abstractions and multi-monitor setups",
      website: "http://squircle.in/",
      logoUrl: "https://squircleit.com/logo.png"
    }
  ];

  return (
    <div className="pt-24 animate-fade-in transition-all duration-500 bg-slate-50 dark:bg-[#0B0E14]">
      {/* Header Section */}
      <section className="py-32 px-6 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-brand/10 text-brand font-black text-[10px] uppercase tracking-widest border border-brand/20 mx-auto">
             Validated Tactical Implementations
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">Customer <span className="text-gradient italic">Success.</span></h1>
          <p className="text-2xl text-slate-400 font-medium max-w-4xl leading-relaxed">
            From Ranigunj to Australia: ProAutoDial architecture powers domestic hubs and international corridors with 99%+ uptime.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          {cases.map((c, i) => (
            <div key={i} className={`grid lg:grid-cols-2 gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`space-y-10 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                   <div className="w-24 h-24 rounded-[2rem] bg-white dark:bg-slate-900 shadow-2xl flex items-center justify-center p-4 border border-slate-100 dark:border-slate-800 overflow-hidden group/logo">
                      <img 
                        src={c.logoUrl} 
                        alt={`${c.company} logo`} 
                        className="max-w-full max-h-full object-contain grayscale group-hover/logo:grayscale-0 transition-all duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.company)}&background=DB5D43&color=fff`;
                        }}
                      />
                   </div>
                   <div>
                      <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-tight">{c.company}</h2>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <span className="text-[9px] font-black uppercase tracking-widest text-brand bg-brand/10 px-3 py-1 rounded-full">{c.scenario}</span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full"><i className="fas fa-location-dot mr-1"></i> {c.location}</span>
                      </div>
                   </div>
                </div>
                
                <div className="p-10 bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden group/card">
                   <div className="absolute top-0 right-0 p-10 text-brand/5 group-hover/card:text-brand/10 transition-colors">
                     <i className={`fas ${c.icon} text-8xl`}></i>
                   </div>
                   <div className="flex items-center gap-4 mb-6">
                      <div className="px-4 py-2 bg-brand text-white rounded-full text-xs font-black shadow-lg shadow-brand/30">
                        {c.metric}
                      </div>
                   </div>
                   <p className="text-xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight mb-4">{c.description}</p>
                   <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic text-lg mb-8">"{c.story}"</p>
                   
                   <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Strategic Coordination</p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{c.coordination}</p>
                   </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-brand hover:text-white transition-all shadow-xl active:scale-95">
                    View Technical Architecture
                  </button>
                  {c.website !== "#" && (
                    <a 
                      href={c.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-10 py-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:border-brand hover:text-brand transition-all shadow-sm flex items-center justify-center gap-3"
                    >
                      Visit Client <i className="fas fa-external-link text-[10px]"></i>
                    </a>
                  )}
                </div>
              </div>
              
              <div className={`relative ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                 <div className="absolute -inset-10 bg-brand/5 blur-[100px] rounded-full"></div>
                 <div className="relative rounded-[4rem] overflow-hidden glossy-glow border-8 border-white dark:border-slate-800 shadow-2xl group/img">
                   <AIImage 
                    prompt={c.prompt} 
                    className="w-full h-[600px] object-cover group-hover/img:scale-105 transition-transform duration-[3s]" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-12">
                      <p className="text-white text-xs font-black uppercase tracking-widest">Operational Visualization • {c.company}</p>
                   </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Global Impact CTA */}
      <section className="py-40 relative overflow-hidden bg-brand text-white">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
         <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">Join the <br /> Excellence.</h2>
            <p className="text-xl text-white/90 font-bold uppercase tracking-[0.3em] max-w-2xl mx-auto">Scaling your Story with 1100+ global industry architects.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
              <button className="px-16 py-7 bg-slate-950 text-white rounded-[2.5rem] font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-black/40">Start Transformation</button>
              <button className="px-16 py-7 bg-white text-brand rounded-[2.5rem] font-black text-xl hover:bg-slate-50 transition-all shadow-2xl">Talk to Architect</button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;
