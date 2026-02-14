
import React from 'react';

const IndustriesSection: React.FC = () => {
  const industries = [
    { name: 'Financial services', icon: 'fa-coins', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'BPO companies', icon: 'fa-people-arrows', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { name: 'e-Commerce', icon: 'fa-cart-shopping', color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { name: 'Education', icon: 'fa-book-open', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Healthcare', icon: 'fa-laptop-medical', color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { name: 'Travel and Hospitality', icon: 'fa-earth-americas', color: 'text-teal-500', bg: 'bg-teal-500/10' },
    { name: 'IT Companies', icon: 'fa-network-wired', color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-500/10' },
    { name: 'Real Estate', icon: 'fa-house-chimney', color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { name: 'Government', icon: 'fa-landmark', color: 'text-red-600', bg: 'bg-red-600/10' },
    { name: 'HR and Recruitment', icon: 'fa-user-tie', color: 'text-slate-800 dark:text-slate-200', bg: 'bg-slate-800/10' },
  ];

  return (
    <section id="industries" className="py-32 bg-white dark:bg-[#0B0E14] transition-colors duration-500 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-24">
          
          {/* Left Column: Heading */}
          <div className="lg:w-1/3 space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-widest">
                Industries
              </h2>
              <div className="w-12 h-1 bg-brand rounded-full"></div>
            </div>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Contact Center Platform tailored to the needs of the industry you operate in.
            </p>
          </div>

          {/* Right Column: Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            {industries.map((item, idx) => (
              <div 
                key={idx} 
                className="group flex items-center gap-5 p-2 rounded-2xl transition-all duration-300 hover:translate-x-2"
              >
                <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                  <i className={`fas ${item.icon} text-xl ${item.color}`}></i>
                </div>
                <span className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand transition-colors">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
          
        </div>
      </div>
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-brand/5 rounded-full blur-[100px] pointer-events-none"></div>
    </section>
  );
};

export default IndustriesSection;
