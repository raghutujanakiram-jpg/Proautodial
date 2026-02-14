
import React from 'react';

const ScaleSection: React.FC = () => {
  const segments = [
    {
      title: 'Startups',
      icon: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 mb-6">
          <rect x="20" y="45" width="60" height="40" rx="4" className="fill-slate-100 dark:fill-slate-800" stroke="#DB5D43" strokeWidth="2" />
          <path d="M50 20 L60 40 L40 40 Z" className="fill-brand animate-bounce" style={{ animationDuration: '3s' }} />
          <path d="M45 40 L55 40 L50 60 Z" fill="#DB5D43" opacity="0.6" />
          <circle cx="50" cy="35" r="3" fill="white" />
          <path d="M30 85 L70 85" stroke="#DB5D43" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      description: 'ProAutoDial assists emerging businesses in identifying, optimizing, and integrating the next-generation systems that will power their growth.',
    },
    {
      title: 'Enterprises',
      icon: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 mb-6">
          <path d="M30 20 H70 V85 H30 Z" className="fill-slate-100 dark:fill-slate-800" stroke="#444" strokeWidth="2" />
          <path d="M40 30 H45 V35 H40 Z M55 30 H60 V35 H55 Z M40 45 H45 V50 H40 Z M55 45 H60 V50 H55 Z M40 60 H45 V65 H40 Z M55 60 H60 V65 H55 Z" fill="#DB5D43" />
          <circle cx="65" cy="70" r="12" className="fill-brand" />
          <circle cx="55" cy="75" r="10" className="fill-brand" opacity="0.8" />
          <path d="M55 75 Q60 70 65 70" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      ),
      description: 'Leave your workplace each evening being confident that your company\'s integrity, communication flow, and infrastructure stability are secure.',
    },
    {
      title: 'Agencies',
      icon: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 mb-6">
          <rect x="25" y="30" width="50" height="40" rx="4" className="fill-slate-100 dark:fill-slate-800" stroke="#444" strokeWidth="2" />
          <rect x="30" y="35" width="40" height="8" rx="1" fill="#DB5D43" />
          <circle cx="50" cy="55" r="4" fill="#DB5D43" />
          <circle cx="50" cy="25" r="6" className="fill-brand" />
          <circle cx="20" cy="50" r="6" className="fill-brand" />
          <circle cx="80" cy="50" r="6" className="fill-brand" />
          <path d="M50 31 L50 40 M26 50 L35 50 M74 50 L65 50" stroke="#444" strokeWidth="2" />
        </svg>
      ),
      description: 'With over 100 qualified technical and network support specialists on board, we have the tools and experience to solve any infrastructure challenge.',
    }
  ];

  return (
    <section className="py-32 bg-white dark:bg-[#0B0E14] relative overflow-hidden transition-colors duration-500">
      {/* Background patterns matching the reference image */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-5 pointer-events-none rotate-45">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
          <rect width="100" height="100" fill="url(#dots)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 space-y-6">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            It doesn't matter if you're <span className="text-brand">big or small</span>
          </h2>
          <div className="w-16 h-1 bg-brand mx-auto rounded-full"></div>
          <p className="text-slate-500 dark:text-slate-400 max-w-4xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            We have everything you'll need to succeed. "AI Support Without any Hassle" is how we describe it. 
            We're monitoring your infrastructure and the services that operate on it, ensuring that your business processes execute smoothly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
          {segments.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group animate-fade-in-up" style={{ animationDelay: `${idx * 0.2}s` }}>
              <div className="transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                {item.icon}
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6 group-hover:text-brand transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-10 text-base">
                {item.description}
              </p>
              <button className="flex items-center gap-3 px-8 py-3 bg-slate-900 dark:bg-slate-800 text-white rounded-full font-bold transition-all hover:bg-brand hover:shadow-xl hover:shadow-brand/30 active:scale-95 group/btn">
                Learn More
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover/btn:translate-x-1">
                  <i className="fas fa-arrow-right text-sm"></i>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScaleSection;
