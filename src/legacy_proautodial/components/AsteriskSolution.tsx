
import React from 'react';

const AsteriskSolution: React.FC = () => {
  const configs = [
    "Configuration of Extensions",
    "Configuration of MeetMe Conference",
    "Configuration of Routing Calls",
    "Configuring Zap Channels (T1/E1, FXO, FXS)",
    "Troubleshooting SIP / IAX Accounts",
    "Configuring Voicemails",
    "Configuring ACD, Call Queues",
    "Solving NAT Connectivity Problems"
  ];

  const ivrPoints = [
    "IVR (Interactive Voice Response) is a technology that automates interaction with telephone callers. Enterprises are increasingly turning to IVR to reduce the cost of common sales, services, collections, inquiries, and support calls to and from their company.",
    "Historically, IVR solutions have used pre-recorded voice prompts and menus to present information and options to callers, and touch-tone telephone keypad entries to gather responses. Modern IVR solutions also enable input and responses to be gathered via spoken words with voice recognition.",
    "IVR solutions enable users to retrieve information including bank balances, flight schedules, product details, order status, movie showtimes, and more from any telephone.",
    "Additionally, IVR solutions are increasingly used to place outbound calls to deliver or gather information for appointments, past-due bills, and other time-critical events and activities.",
    "IVR enables callers to interact more intuitively with automated phone systems, while at the same time providing significant cost reductions over human operators."
  ];

  return (
    <div className="pt-24 animate-fade-in transition-colors duration-500 bg-white dark:bg-[#0B0E14]">
      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="0.1" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand/20 text-brand font-black text-[10px] uppercase tracking-widest border border-brand/30">
              Legacy Systems Expertise
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              Asterisk <span className="text-brand">Solution</span>
            </h1>
            <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-2xl">
              While <strong>ProAutoDial</strong> is our flagship AI powerhouse, we deeply respect the foundations of modern telephony. We provide elite support for Asterisk, the world's leading open-source convergence platform.
            </p>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-48 h-48 rounded-[3rem] bg-brand flex items-center justify-center shadow-2xl glossy-glow transform rotate-3 hover:rotate-0 transition-transform duration-700">
               <i className="fas fa-asterisk text-7xl text-white"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Request Call Back Strip */}
      <div className="bg-brand py-4 px-6 text-center text-white font-black text-sm uppercase tracking-widest hover:brightness-110 transition-all cursor-pointer group">
        Have one of our experts talk to you. <span className="underline group-hover:no-underline">Request a Call Back</span> <i className="fas fa-arrow-right-long ml-2 transition-transform group-hover:translate-x-2"></i>
      </div>

      {/* Content Overview */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="space-y-16">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Overview</h2>
              <div className="w-16 h-1.5 bg-brand rounded-full"></div>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>Asterisk</strong> is an open-source platform for building communication applications, including <strong>IP PBX systems, VoIP gateways</strong>, and conference servers. It is highly customizable and scalable, making it a popular choice for businesses of all sizes.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                No other PBX can be used in as many inventive ways as Asterisk PBX. Below are the following implementations we provide:
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {configs.map((config, idx) => (
                <div key={idx} className="group glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand transition-all flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center font-black text-xs flex-shrink-0 group-hover:bg-brand group-hover:text-white transition-all">
                    {idx + 1}
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-tight">
                    {config}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 pt-16 border-t border-slate-100 dark:border-slate-800">
             <div className="space-y-6">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Deep Modification</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  We perform module modifications in Asterisk as per your requirements, including source code optimization for higher call capacity and bug fixing.
                </p>
             </div>
             <div className="space-y-6">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Dial Plan Programming</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  The dial plan is truly the heart of any Asterisk system. We configure dial plans for broadcasting, call center solutions, and complex IVR applications.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* IVR Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950/50 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Custom IVR Design</h2>
            <p className="text-slate-500 font-medium">Revolutionize your interaction flow with precision automation.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {ivrPoints.map((point, idx) => (
               <div key={idx} className="flex gap-6 items-start group">
                 <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center text-brand font-black text-2xl group-hover:bg-brand group-hover:text-white transition-all duration-500 flex-shrink-0">
                    {idx + 1}
                 </div>
                 <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium pt-2">
                   {point}
                 </p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto glass p-16 md:p-24 rounded-[4rem] border-brand/20 text-center space-y-10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-32 h-32 bg-brand/5 rounded-full -ml-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight relative z-10">
            Do you wish to discuss your project with our <span className="text-brand">Telephony Experts?</span>
          </h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium relative z-10">
            From Asterisk legacy maintenance to ProAutoDial AI integration, we help you transition at your own pace.
          </p>
          <button className="relative z-10 px-12 py-6 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-[1.5rem] font-black text-xl hover:bg-brand dark:hover:bg-brand dark:hover:text-white shadow-2xl transition-all hover:-translate-y-2 active:scale-95">
            Contact Expert Solutions
          </button>
        </div>
      </section>
    </div>
  );
};

export default AsteriskSolution;
