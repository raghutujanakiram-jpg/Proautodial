
import React from 'react';

interface LegalPageProps {
  type: 'terms' | 'privacy' | 'refund' | 'disclaimer';
}

const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const content = {
    terms: {
      title: "Terms and Conditions",
      subtitle: "Strategic Framework for Telephony Operations",
      sections: [
        {
          h: "1. Acceptance of Protocol",
          p: "By engaging with Proautodial Telephony Services Pvt Ltd (www.proautodial.in), you agree to operate within the parameters defined by global telephony standards and local regulatory frameworks. Access to our neural and legacy clusters is contingent upon adherence to these terms."
        },
        {
          h: "2. Service Provisioning",
          p: "We provide managed hosting, installation, and AI bridge services. 'Provisioning' constitutes the technical handshake between our nodes and your operational endpoints. We maintain a 99.9% uptime target for all enterprise-grade clusters."
        },
        {
          h: "3. Compliance & Ethics",
          p: "Users are strictly prohibited from utilizing Proautodial clusters for fraudulent, deceptive, or illegal broadcasting. Deterministic DNC filtering is encouraged at the gateway level."
        },
        {
          h: "4. Intellectual Identity",
          p: "All neural identities, synthesis logic, and architectural designs provided by Proautodial remain the exclusive property of Proautodial Telephony Services Pvt Ltd unless explicitly transferred via a strategic asset purchase agreement."
        }
      ]
    },
    privacy: {
      title: "Privacy Policy",
      subtitle: "Data Integrity & Neural Privacy Standards",
      sections: [
        {
          h: "1. Data Collection Node",
          p: "We collect operational metadata required for call routing, transcription, and system optimization. This includes SIP headers, call durations, and neural intent analysis packets."
        },
        {
          h: "2. Recording Archive Policy",
          p: "Call recordings are encrypted at rest and accessible only via authorized administrative keys. Proautodial does not store plain-text transcriptions outside of your dedicated project environment."
        },
        {
          h: "3. Third-Party Uplinks",
          p: "Your data may transit via Tier-1 carriers (Twilio, Plivo, etc.) as required for global termination. These handshakes are governed by industry-standard encryption protocols (TLS/SRTP)."
        },
        {
          h: "4. Neural Training Opt-Out",
          p: "Enterprise clients may opt-out of local neural training nodes, ensuring their proprietary operational logic is never synthesized across the global Proautodial fabric."
        }
      ]
    },
    refund: {
      title: "Refund Policy",
      subtitle: "Capital Allocation & Resource Commitments",
      sections: [
        {
          h: "1. Provisioning Fees",
          p: "Setup and installation fees for Vicidial, Goautodial, and Asterisk clusters represent immediate resource allocation and are non-refundable once the node synchronization begins."
        },
        {
          h: "2. Subscription Cycles",
          p: "Monthly managed hosting and AI agent subscriptions may be terminated with 15 days notice. Refunds for partial cycles are not issued; services remain active until the end of the current billing node."
        },
        {
          h: "3. Hardware & SIP Deposits",
          p: "Deposits for GSM gateways or SIP trunking balances are subject to the policies of our hardware partners and upstream carriers. Proautodial facilitates these requests but does not guarantee third-party returns."
        },
        {
          h: "4. Strategic Support Credits",
          p: "Hourly support credits remain valid for 12 months. Unused credits within this window are considered committed resources and are non-refundable."
        }
      ]
    },
    disclaimer: {
      title: "Disclaimer",
      subtitle: "Operational Risks & Limitations of Liability",
      sections: [
        {
          h: "1. General Information Node",
          p: "The content on www.proautodial.in is for strategic guidance. While we strive for peak accuracy, telephony landscapes evolve rapidly, and we do not guarantee the permanence of external API endpoints."
        },
        {
          h: "2. Performance Variance",
          p: "AI agent performance and predictive dialing ratios depend heavily on lead quality and carrier stability. Results vary by industry and regional regulatory constraints."
        },
        {
          h: "3. Third-Party Failures",
          p: "Proautodial is not liable for service interruptions caused by Tier-1 carrier outages, global internet infrastructure failures, or local power disruptions at client endpoints."
        },
        {
          h: "4. No Professional Advice",
          p: "Our tactical support does not constitute legal counsel regarding DNC, TCPA, or GDPR compliance. Clients are encouraged to seek local legal synchronization for their specific outreach campaigns."
        }
      ]
    }
  };

  const data = content[type];

  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 animate-fade-in transition-all duration-500">
      {/* Hero Header */}
      <section className="py-32 px-6 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand/10 text-brand font-black text-[9px] uppercase tracking-[0.3em] border border-brand/20">
            Official Policy Node
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase italic">
            {data.title.split(' ')[0]} <span className="text-gradient not-italic">{data.title.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium">{data.subtitle}</p>
        </div>
      </section>

      {/* Document Body */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[4rem] p-12 md:p-24 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 left-0 w-2 h-full bg-brand/20"></div>
           <div className="space-y-16 relative z-10">
              {data.sections.map((sec, i) => (
                <div key={i} className="space-y-6 group">
                   <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-brand transition-colors">
                     {sec.h}
                   </h2>
                   <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                     {sec.p}
                   </p>
                </div>
              ))}
              
              <div className="pt-16 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 opacity-60">
                 <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase text-slate-500">Document Authority</p>
                   <p className="text-sm font-bold dark:text-white">Proautodial Telephony Services Pvt Ltd</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[10px] font-black uppercase text-slate-500">Last Synchronized</p>
                   <p className="text-sm font-bold dark:text-white">December 2024</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Verification Strip */}
      <section className="py-20 bg-slate-100 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
         <div className="max-w-4xl mx-auto px-6 flex justify-center gap-12 grayscale opacity-40">
            {['ISO-9001 SYNC', 'TELEPHONY SAFE', 'Neural Compliance', 'GDPR Node Active'].map(label => (
              <span key={label} className="text-[9px] font-black uppercase tracking-[0.3em] dark:text-white">{label}</span>
            ))}
         </div>
      </section>

      {/* Global Outreach CTA */}
      <section className="py-40 bg-brand text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-3xl mx-auto px-6 text-center space-y-10 relative z-10">
           <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase italic">Scale with <br /> Transparency.</h2>
           <p className="text-lg text-white/80 font-bold uppercase tracking-widest max-w-xl mx-auto leading-relaxed">
             For detailed legal inquiries regarding our global clusters, please contact the Proautodial architecture node.
           </p>
           <button className="px-14 py-6 bg-slate-950 text-white rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-black/40">
              Submit Inquiry
           </button>
        </div>
      </section>
    </div>
  );
};

export default LegalPage;
