
import React, { useState } from 'react';
import { CURRENCIES, CurrencyCode } from '../types';

const PricingEngine: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('INR');

  const plans = [
    {
      name: 'Startup Node',
      price: { INR: '4,999', AED: '220', EUR: '55', USD: '60' },
      concurrency: 'Up to 2',
      features: [
        'Standard AI Assistants',
        'Gemini 2.5 Flash Engine',
        'Standard Voices',
        'Web API Access',
        'Community Support'
      ]
    },
    {
      name: 'Pro Engine',
      price: { INR: '24,999', AED: '1,100', EUR: '275', USD: '300' },
      concurrency: 'Up to 25',
      featured: true,
      features: [
        'Advanced Neural Personas',
        'Gemini 3 Pro Engine',
        'Full Knowledge Forge',
        'Carrier-Grade HD Audio',
        'Priority Technical Support'
      ]
    },
    {
      name: 'Enterprise Matrix',
      price: { INR: '99,999', AED: '4,400', EUR: '1,100', USD: '1,200' },
      concurrency: 'Unlimited*',
      features: [
        'Custom Neural Tuning',
        'Veo Video Synthesis',
        'Multi-Region Uplinks',
        'Carrier-Grade SLA (99.99%)',
        'Dedicated Solutions Architect'
      ]
    }
  ];

  const currency = CURRENCIES.find(c => c.code === selectedCurrency)!;

  return (
    <div className="pt-40 pb-20 px-6 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-brand/10 text-brand font-black text-[10px] uppercase tracking-widest border border-brand/20 mx-auto">
            Strategic Pricing Models
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">Plan your <span className="text-gradient">Empire.</span></h1>
          
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Select Operational Currency</p>
            <div className="flex justify-center gap-3 bg-slate-100 dark:bg-slate-900 p-2 rounded-2xl w-fit mx-auto border border-slate-200 dark:border-slate-800">
              {CURRENCIES.map(c => (
                <button 
                  key={c.code}
                  onClick={() => setSelectedCurrency(c.code)}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${selectedCurrency === c.code ? 'bg-brand text-white shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                >
                  <span className="text-base">{c.flag}</span> {c.code}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {plans.map((p, i) => (
            <div key={i} className={`p-12 rounded-[3.5rem] flex flex-col border transition-all duration-700 ${p.featured ? 'bg-slate-950 dark:bg-slate-900 border-brand shadow-2xl shadow-brand/20 scale-105 relative z-10' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-900 hover:-translate-y-4 shadow-sm'}`}>
              {p.featured && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand/30">Most Popular Strategy</span>}
              
              <div className="mb-10">
                <h3 className={`text-2xl font-black uppercase tracking-widest mb-4 ${p.featured ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{p.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className={`text-5xl font-black tracking-tight ${p.featured ? 'text-brand' : 'text-slate-900 dark:text-white'}`}>{currency.symbol}{p.price[selectedCurrency]}</span>
                  <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">/ month</span>
                </div>
              </div>

              <div className="flex-1 space-y-8 mb-12">
                <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Active Channels</p>
                  <p className={`text-lg font-bold ${p.featured ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`}>{p.concurrency}</p>
                </div>
                <ul className="space-y-4">
                  {p.features.map(f => (
                    <li key={f} className={`flex items-center gap-3 text-sm font-bold ${p.featured ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                      <i className="fas fa-check-circle text-brand"></i> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${p.featured ? 'bg-brand text-white hover:brightness-110 shadow-xl shadow-brand/30' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:brightness-110'}`}>
                Engage Tier
              </button>
            </div>
          ))}
        </div>

        {/* Payments Strip */}
        <div className="pt-20 border-t dark:border-slate-900">
           <div className="text-center space-y-10">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Universal Payment Integration</p>
             <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                <i className="fab fa-cc-stripe text-5xl"></i>
                <i className="fab fa-cc-paypal text-5xl"></i>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Razorpay_logo.svg" className="h-8 dark:invert" alt="Razorpay" />
                <i className="fab fa-cc-apple-pay text-5xl"></i>
                <i className="fab fa-google-pay text-5xl"></i>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PricingEngine;
