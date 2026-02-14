
import React, { useState } from 'react';
import { AppView } from '../types';
import AIImage from '../components/AIImage';

interface UseCasesPageProps {
  onNavigate: (view: AppView) => void;
}

const UseCasesPage: React.FC<UseCasesPageProps> = ({ onNavigate }) => {
  const [activeIndustry, setActiveIndustry] = useState('Financial Services');

  const industries = [
    {
      name: 'Financial Services',
      icon: 'fa-coins',
      color: 'text-emerald-500',
      heroPrompt: "High-tech fintech office, holographic data charts, emerald green accent lighting, cinematic",
      challenges: ["High volume of debt collection calls", "Strict compliance (RBI/SEBI) needs", "Fraud detection latency"],
      solution: "Automated Collections Agent",
      flow: [
        { step: "Inbound/Outbound", desc: "Customer enters flow via proactive dialer or support line" },
        { step: "Identity Verification", desc: "Voice biometrics & OTP validation (2FA)" },
        { step: "Intent Classification", desc: "AI determines: Payment Promise vs Dispute vs Inquiry" },
        { step: "Resolution", desc: "Secure payment gateway link sent via SMS/WhatsApp" }
      ],
      kpis: ["30% Higher Recovery Rate", "100% Audit Compliance", "Zero Human Bias"]
    },
    {
      name: 'Healthcare',
      icon: 'fa-laptop-medical',
      color: 'text-orange-500',
      heroPrompt: "Futuristic medical control room, clean white and orange aesthetic, DNA helix hologram",
      challenges: ["Missed appointments", "Patient triage bottlenecks", "24/7 emergency response handling"],
      solution: "Patient Care Coordinator",
      flow: [
        { step: "Appointment Trigger", desc: "System syncs with EMR to find upcoming slots" },
        { step: "Reminder Call", desc: "AI calls patient to confirm/reschedule (Natural Language)" },
        { step: "Triage", desc: "Symptom check: Connect to Nurse if urgent, else book slot" },
        { step: "Confirmation", desc: "Calendar invite & prep instructions sent" }
      ],
      kpis: ["40% Drop in No-Shows", "2-Min Avg Booking Time", "24/7 Patient Access"]
    },
    {
      name: 'e-Commerce',
      icon: 'fa-cart-shopping',
      color: 'text-purple-500',
      heroPrompt: "Modern logistics hub visualization, purple neon lights, boxes moving on belts, digital overlay",
      challenges: ["Order status anxiety (WISMO)", "Return/Refund complexity", "Peak season scaling"],
      solution: "Order Logistics Bot",
      flow: [
        { step: "Order Query", desc: "User asks 'Where is my package?'" },
        { step: "API Lookup", desc: "Agent fetches real-time status from Shopify/Magento" },
        { step: "Proactive Alert", desc: "If delayed, offer coupon code automatically" },
        { step: "Handoff", desc: "Escalate to human only for damaged goods claims" }
      ],
      kpis: ["70% Ticket Deflection", "Instant Status Updates", "Higher CSAT Score"]
    },
    {
      name: 'Real Estate',
      icon: 'fa-house-chimney',
      color: 'text-rose-500',
      heroPrompt: "Architectural visualization of smart city, rose gold lighting, sleek glass buildings",
      challenges: ["Lead leakage during off-hours", "Unqualified site visits", "Agent scheduling chaos"],
      solution: "Property Visit Scheduler",
      flow: [
        { step: "Lead Capture", desc: "Inbound call from property portal listing" },
        { step: "Pre-Qualification", desc: "Ask Budget, Timeline, & Location preference" },
        { step: "Scheduling", desc: "Check agent calendar & book site visit" },
        { step: "Nurture", desc: "Send property brochure via WhatsApp" }
      ],
      kpis: ["2x More Site Visits", "Zero Lead Leakage", "Auto-Calendar Sync"]
    },
    {
      name: 'Education',
      icon: 'fa-graduation-cap',
      color: 'text-blue-500',
      heroPrompt: "Futuristic university campus library, digital books, blue ambient light, knowledge concept",
      challenges: ["Counseling bandwidth during admissions", "Fee payment reminders", "Course FAQ volume"],
      solution: "Admissions Counselor AI",
      flow: [
        { step: "Inquiry", desc: "Student asks about course eligibility" },
        { step: "Screening", desc: "Check marks/grades criteria automatically" },
        { step: "Counseling", desc: "Explain syllabus & career prospects (RAG enabled)" },
        { step: "Application", desc: "Guide through form submission process" }
      ],
      kpis: ["5x Faster Admissions", "24/7 Student Support", "Consistent Messaging"]
    }
  ];

  const activeData = industries.find(i => i.name === activeIndustry) || industries[0];

  return (
    <div className="pt-24 animate-fade-in bg-slate-50 dark:bg-slate-950 min-h-screen">
      
      {/* Hero Section */}
      <section className="py-24 px-6 relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="w-2 h-2 bg-brand rounded-full animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-widest">Industry-Specific Architectures</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              Tailored Flows for <br />
              <span className="text-brand">{activeIndustry}.</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
              Don't just auto-dial. Deploy intelligent, context-aware workflows designed for the specific nuances of your sector.
            </p>
          </div>
          <div className="relative group">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 glossy-glow">
              <AIImage 
                prompt={activeData.heroPrompt} 
                className="w-full h-[500px] group-hover:scale-105 transition-transform duration-[2s]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industry Selector Bar */}
      <section className="sticky top-24 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-y border-slate-200 dark:border-slate-800 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 py-4 min-w-max">
            {industries.map(ind => (
              <button
                key={ind.name}
                onClick={() => setActiveIndustry(ind.name)}
                className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 ${
                  activeIndustry === ind.name 
                    ? 'bg-brand text-white shadow-lg scale-105' 
                    : 'bg-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <i className={`fas ${ind.icon}`}></i>
                {ind.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* Challenge vs Solution */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-xl">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tight flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center text-lg"><i className="fas fa-triangle-exclamation"></i></span>
                Key Challenges
              </h3>
              <ul className="space-y-6">
                {activeData.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-600 dark:text-slate-400 font-bold">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-10 bg-slate-900 dark:bg-black rounded-[3rem] border border-brand/20 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-20 bg-brand/5 rounded-full blur-3xl pointer-events-none"></div>
              <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tight flex items-center gap-4 relative z-10">
                <span className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center text-lg shadow-lg shadow-brand/40"><i className="fas fa-wand-magic-sparkles"></i></span>
                AI Solution
              </h3>
              <div className="relative z-10 space-y-6">
                <h4 className="text-3xl font-black text-brand">{activeData.solution}</h4>
                <p className="text-slate-400 font-medium">Deploy a specialized neural agent trained on {activeIndustry} vocabulary and compliance protocols.</p>
                <div className="flex gap-4 pt-4">
                  {activeData.kpis.map((k, i) => (
                    <div key={i} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                      {k}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Workflow Visualization */}
          <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 md:p-20 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-16">
            <div className="space-y-4">
               <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Intelligent <span className="text-brand">Call Flow</span></h3>
               <p className="text-slate-500 font-medium">Visualizing the automated journey for {activeIndustry} interactions.</p>
            </div>
            
            <div className="relative">
              {/* Connector Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 hidden md:block"></div>
              
              <div className="grid md:grid-cols-4 gap-8 relative z-10">
                {activeData.flow.map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-6 group">
                    <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-800 border-4 border-slate-100 dark:border-slate-700 flex items-center justify-center text-2xl text-slate-400 group-hover:border-brand group-hover:text-brand group-hover:scale-110 transition-all shadow-xl z-10 relative">
                      <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center border-2 border-white dark:border-slate-800">{i + 1}</span>
                      <i className={`fas ${i === 0 ? 'fa-phone' : i === 1 ? 'fa-brain' : i === 2 ? 'fa-code-branch' : 'fa-flag-checkered'}`}></i>
                    </div>
                    <div className="space-y-2 px-4">
                      <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight text-sm">{step.step}</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-8">
              <button onClick={() => onNavigate(AppView.BOOK_DEMO)} className="px-10 py-4 bg-brand text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-brand/30 hover:scale-105 transition-all">
                Deploy This Flow
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default UseCasesPage;
