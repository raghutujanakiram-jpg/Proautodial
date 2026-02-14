
import React from 'react';
import AIImage from '../components/AIImage';
import { AppView } from '../types';

interface ProductDetailPageProps {
  type: string;
  onNavigate: (view: AppView) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ type, onNavigate }) => {
  const productData: Record<string, any> = {
    "Lead Qualification": {
      desc: "AI BDR that screens, enriches, and routes leads automatically across voice, SMS, and email.",
      icon: "fa-filter-circle-dollar",
      benefits: ["BANT Scoring", "CRM Auto-Create", "No-Show Prevention", "Follow-up Cadence"],
      prompt: "Professional contact center with AI scoring dashboards, coral and slate brand colors, sleek 3D style"
    },
    "Assisted Selling": {
      desc: "Real-time co-pilot for agents that recommends next best action and objection handling.",
      icon: "fa-hand-holding-dollar",
      benefits: ["Live Cue Cards", "A/B Pitching", "Cart Recovery", "Upsell/Bundle Offers"],
      prompt: "Sales desk with holographic recommendation panels and call notes, premium corporate look"
    },
    "SDR Automation": {
      desc: "Outbound discovery at scale—prospect outreach, qualification, and meeting scheduling.",
      icon: "fa-bolt",
      benefits: ["Sequence Engine", "Intent Detection", "Calendar Sync", "Voicemail Drop"],
      prompt: "Digital outreach network with glowing nodes and calendars syncing in real time"
    },
    "AI Sales Agent": {
      desc: "Fully autonomous AI voice agent that holds natural, persuasive conversations to progress deals.",
      icon: "fa-user-tie",
      benefits: ["Interrupt Handling", "Personalization", "Secure Payments Handoff", "Analytics"],
      prompt: "Human-like AI agent talking on a sleek headset in a modern office, brand tones"
    },
    "Appointment Management": {
      desc: "24/7 scheduling, rescheduling, and reminders with calendar integration and confirmations.",
      icon: "fa-calendar-check",
      benefits: ["Calendar APIs", "SMS/Voice Reminders", "Smart Rescheduling", "Queue Deflection"],
      prompt: "Calendar-centric command panel with glowing confirmation badges, clean UI"
    },
    "AI Customer Service Agent": {
      desc: "Voice-first support agent for triage, FAQs, returns, and account actions without escalation.",
      icon: "fa-headset",
      benefits: ["RAG Knowledge Sync", "Ticketing Integration", "Secure Identity Checks", "Containment"],
      prompt: "Support hub with knowledge base graphs and ticket pipelines, precise 3D render"
    },
    "AI Booking Agent": {
      desc: "End-to-end booking & modifications for travel, healthcare, and services with payments handoff.",
      icon: "fa-ticket",
      benefits: ["Inventory Checks", "Slot Discovery", "Multi-lingual", "PCI-Safe Transfers"],
      prompt: "Booking console with flight/hospital slots visualized as glowing tiles, premium style"
    },
    "AI Lead Qualification Agent": {
      desc: "Autonomous pre-sales agent qualifying and routing leads round-the-clock across channels.",
      icon: "fa-user-check",
      benefits: ["Omnichannel Intake", "Scoring & Routing", "CRM Enrichment", "Analytics"],
      prompt: "Omnichannel board with chat, email, voice streams converging into CRM pipelines"
    },
    "Corporate Training": {
      desc: "Voice simulation and coaching for sales/support teams with assessments and scorecards.",
      icon: "fa-chalkboard-user",
      benefits: ["Scenario Simulator", "Real-time Feedback", "Assessments", "Progress Reports"],
      prompt: "Training room with virtual avatars and score dashboards, modern enterprise feel"
    },
    "AI Call Center & Phone Agents": {
      desc: "Low-latency phone agents that handle transfers, interruptions, and long conversations gracefully.",
      icon: "fa-phone",
      benefits: ["Sub-400ms Latency", "Barge/Whisper", "Cold/Warm Transfer", "Edge Caching"],
      prompt: "Telephony control room with waveforms and call routing visualized, brand colors"
    },
    "Flow Builder": {
      desc: "Visual designer to build IVRs, intents, self-service paths, and intelligent routing without code.",
      icon: "fa-diagram-project",
      benefits: ["Drag-and-Drop", "A/B Paths", "Realtime Preview", "Versioning"],
      prompt: "Flowchart canvas with draggable nodes and connections, polished 3D interface"
    },
    "IVR": {
      desc: "Next-gen IVR with dynamic menus, intent detection, and personalized routing.",
      icon: "fa-voicemail",
      benefits: ["Speech + DTMF", "Intent Router", "Context Memory", "Fallback to Human"],
      prompt: "IVR menu trees as glowing graphs with call paths highlighted in motion"
    },
    "Auto Dialer": {
      desc: "Efficiency-first automated dialing sequences that maximize agent talk time and operational throughput.",
      icon: "fa-robot",
      benefits: ["Automated Workflow", "Time Savings", "Intelligent Retry Logic", "CRM Sync"],
      prompt: "Futuristic robot arm holding a professional telephone, sleek tech office, coral and slate theme"
    },
    "Virtual Call Center": {
      desc: "Robust omnichannel support hub for global teams, integrating voice, chat, and CRM seamlessly.",
      icon: "fa-headset",
      benefits: ["Omnichannel Flow", "Live Monitoring", "Skill-based Routing", "Queue Management"],
      prompt: "Futuristic command center with large holographic screens showing call center metrics"
    },
    "Predictive Dialer": {
      desc: "Advanced neural algorithms that predict agent availability and dial numbers to maintain a perfect talk-time balance.",
      icon: "fa-bolt",
      benefits: ["Lead Scoring", "Lower Dropout Rate", "Optimal Concurrency", "Performance Analytics"],
      prompt: "Abstract visualization of lightning fast data transmission, glowing networks, coral colors"
    },
    "Vicidial Mastery": {
      desc: "The world's leading open-source contact center suite. We provide elite deployment of multi-server Vicidial clusters capable of handling thousands of agents.",
      icon: "fa-server",
      benefits: ["Multi-Server Clustering", "MariaDB 10.x Performance", "Full API Integration", "Advanced Reporting Nodes"],
      prompt: "Complex server rack with glowing internal components, tech blueprint overlay, professional aesthetic"
    },
    "Vicidial v11 Installation": {
      desc: "Expert provisioning of the latest Vicidial v11 release. Optimized for high-capacity outbound outreach with enhanced security and stability patches.",
      icon: "fa-headset",
      benefits: ["PHP 8.2 Compatibility", "Carrier-Grade LCR Tuning", "Dynamic Firewall Integration", "Real-time Dashboarding"],
      prompt: "Futuristic datacenter with multiple server nodes glowing with orange and blue light, 8k render, professional"
    },
    "Goautodial v4 Migration": {
      desc: "Upgrade to the most user-friendly open-source contact center UI. Goautodial v4 features a responsive design and native WebRTC support for browser-based dialing.",
      icon: "fa-rocket",
      benefits: ["Just-Dial Agent UI", "Responsive Bootstrap Nodes", "Integrated Webphone", "Automated Installer Sync"],
      prompt: "Rocket taking off from a motherboard, glowing circuits, sleek 3D visualization, high-end professional"
    },
    "Asterisk Dialplan Design": {
      desc: "Custom AGI (Asterisk Gateway Interface) scripting and dialplan engineering to create deterministic, high-capacity IVR and routing logic.",
      icon: "fa-asterisk",
      benefits: ["Bespoke AGI Logic", "Dynamic IVR Flows", "Sip-Trunk Optimization", "Custom MeetMe Bridges"],
      prompt: "A floating 3D asterisk symbol made of digital code and glowing nodes, futuristic, mathematical aesthetic"
    },
    "FreePBX / Issabel Setup": {
      desc: "Unified communication hubs for the modern enterprise. Professional setup of office PBX systems with secure remote extension capabilities.",
      icon: "fa-phone-volume",
      benefits: ["Unified Comms Bridge", "Secure Remote Extensions", "User-Friendly Admin Node", "Call Recording Archive"],
      prompt: "A modern corporate office phone system visualization, glowing holographic connection lines, sleek design"
    },
    "Managed Hosting": {
      desc: "High-performance cloud infrastructure specifically tuned for SIP/VoIP traffic. 99.99% uptime with dedicated CPU and high-speed NVMe storage.",
      icon: "fa-cloud-binary",
      benefits: ["VOIP-Optimized Stack", "Daily Automated Backups", "Managed OS Hardening", "Global Latency Routing"],
      prompt: "Floating digital server unit in a clean data center nebula, high-fidelity 3D render"
    },
    "Robo Dialer": {
      desc: "Mass broadcast engine for notifications, alerts, and political outreach. Compliant filtering with high-concurrency channel capacity.",
      icon: "fa-bullhorn",
      benefits: ["Infinite Concurrency", "TTS Identity Integration", "DNC Guard System", "Real-time Delivery Logs"],
      prompt: "Modern broadcasting tower sending digital pulses across a glowing city grid"
    },
    "Hourly Support": {
      desc: "On-demand tactical engineering for Vicidial, Goautodial, and Asterisk systems. Resolve server bugs, database locks, and carrier issues instantly.",
      icon: "fa-clock",
      benefits: ["60-Min SLA Response", "Senior VoIP Engineers", "Security Auditing", "Database Refactoring"],
      prompt: "Close up of a high-tech digital clock and computer code, cinematic professional lighting"
    },
    "Dedicated Tech Person": {
      desc: "Assign a permanent Proautodial architect to your enterprise account for proactive maintenance, scaling, and feature development.",
      icon: "fa-user-gear",
      benefits: ["24/7 Priority Access", "Proactive Monitoring", "Custom Module Dev", "Internal SLA Tracking"],
      prompt: "Futuristic professional architect portrait with holographic data interface"
    }
  };

  const data = productData[type] || productData["Auto Dialer"];

  return (
    <div className="pt-24 animate-fade-in transition-all duration-500 bg-slate-50 dark:bg-slate-950">
      <section className="py-32 px-6 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="space-y-10">
            <div className="w-20 h-20 bg-brand rounded-3xl flex items-center justify-center text-white text-4xl shadow-xl shadow-brand/30 animate-float"><i className={`fas ${data.icon}`}></i></div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase italic">{type.split(' ')[0]} <br /><span className="text-gradient not-italic">{type.split(' ').slice(1).join(' ')}</span></h1>
            <p className="text-2xl text-slate-400 font-medium leading-relaxed max-w-xl">{data.desc}</p>
            <div className="flex flex-wrap gap-4">
               <button 
                onClick={() => onNavigate(AppView.PRICING)}
                className="px-12 py-5 bg-brand text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl shadow-brand/40 hover:scale-105 transition-all"
               >
                 Provision Strategy
               </button>
               <button 
                onClick={() => onNavigate(AppView.SUPPORT_CENTER)}
                className="px-12 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all"
               >
                 View Manual
               </button>
            </div>
          </div>
          <div className="relative group">
             <div className="absolute -inset-10 bg-brand/10 rounded-full blur-[120px]"></div>
             <div className="rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white/5 glossy-glow">
                <AIImage prompt={data.prompt} className="h-[600px] w-full group-hover:scale-105 transition-transform duration-[2s] object-cover" />
             </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-24">
             <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand">Professional Implementation Node</h3>
             <h2 className="text-4xl font-black dark:text-white uppercase tracking-tight">Technical <span className="text-brand">Parameters</span></h2>
             <p className="text-xl text-slate-500 font-medium">Derived from 15+ years of Goautodial & Vicidial expertise.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             {data.benefits.map((b: string, i: number) => (
               <div key={i} className="p-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] hover:border-brand/30 transition-all group shadow-sm hover:shadow-2xl hover:-translate-y-2">
                  <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-8 group-hover:bg-brand group-hover:text-white transition-all shadow-sm"><i className="fas fa-check"></i></div>
                  <h4 className="text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-brand transition-colors leading-none">{b}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Enterprise-grade synchronization ensuring peak operational efficiency for your global node.</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-40 bg-slate-950 text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 p-32 text-brand/5 pointer-events-none rotate-12"><i className={`fas ${data.icon} text-[20rem]`}></i></div>
         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center relative z-10">
            <div className="space-y-8">
               <h3 className="text-5xl font-black tracking-tighter uppercase leading-tight">Scale your <br /><span className="text-brand">Global Cluster</span> today.</h3>
               <p className="text-xl text-slate-400 font-medium leading-relaxed">Operated by Proautodial Telephony services pvt ltd at www.proautodial.in — Modernizing legacy open-source telephony since 2008.</p>
               <ul className="space-y-6">
                  {['99.99% Node Continuity SLA', 'Sub-350ms WebRTC Latency', 'Direct Architect Hotlines'].map(li => (
                    <li key={li} className="flex items-center gap-5 text-lg font-bold text-slate-300">
                       <i className="fas fa-circle-check text-brand"></i> {li}
                    </li>
                  ))}
               </ul>
            </div>
            <div className="p-16 bg-slate-900 border border-slate-800 rounded-[4rem] text-center space-y-10 shadow-2xl">
               <h4 className="text-2xl font-black uppercase tracking-tight">Initialize Migration Node</h4>
               <p className="text-slate-400 font-medium">Switch from your legacy provider to a high-performance Proautodial cluster with ZERO downtime.</p>
               <button 
                onClick={() => onNavigate(AppView.CONTACT)}
                className="w-full py-6 bg-brand text-white rounded-[2rem] font-black uppercase text-[10px] tracking-widest hover:brightness-110 shadow-2xl transition-all border border-brand/20"
               >
                 Start FREE Migration
               </button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
