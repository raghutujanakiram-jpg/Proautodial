
import React, { useMemo, useState } from 'react';
import { CURRENCIES, CurrencyCode } from '../types';

const Pricing: React.FC = () => {
  const detectLocalCurrency = (): CurrencyCode => {
    const lang = navigator.language || 'en-US';
    const region = (lang.split('-')[1] || '').toUpperCase();
    const regionMap: Record<string, CurrencyCode> = {
      IN: 'INR', LK: 'LKR', TH: 'THB', MY: 'MYR', PH: 'PHP', BD: 'BDT', MV: 'MVR',
      MU: 'MUR', VN: 'VND', AE: 'AED', SA: 'SAR', ZA: 'ZAR', IE: 'EUR'
    };
    return (regionMap[region] as CurrencyCode) || 'USD';
  };
  const [currency, setCurrency] = useState<CurrencyCode>(detectLocalCurrency());

  const rates: Record<CurrencyCode, number> = {
    USD: 1,
    INR: 83,
    LKR: 300,
    THB: 34,
    MYR: 4.5,
    PHP: 56,
    BDT: 109,
    MVR: 15.4,
    MUR: 45,
    VND: 25000,
    AED: 3.67,
    SAR: 3.75,
    ZAR: 18.5,
    EUR: 0.92
  };

  const proPlans = [
    { name: 'Starter', usd: 19, features: ['Up to 10 Agents', 'Basic AI Voice', 'Cloud Deployment', 'Email Support'] },
    { name: 'Professional', usd: 99, popular: true, features: ['Up to 50 Agents', 'Full AI Voice Agents', 'Predictive Dialing', 'Priority Support'] },
    { name: 'Enterprise', usd: NaN, features: ['Unlimited Agents', 'Hybrid Deployment', 'Dedicated Manager', 'Custom API Tuning'] }
  ];

  const currentSym = CURRENCIES.find(c => c.code === currency)?.symbol;
  const currencyOptions = useMemo<CurrencyCode[]>(() => {
    const primary = detectLocalCurrency();
    // Show local + INR + USD (deduped)
    const set = new Set<CurrencyCode>([primary, primary === 'INR' ? 'USD' : 'INR', 'USD']);
    return Array.from(set);
  }, []);

  const fmt = (usd: number) => {
    if (Number.isNaN(usd)) return 'Custom';
    const value = usd * (rates[currency] || 1);
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: currency === 'VND' ? 0 : 2 }).format(value);
  };

  return (
    <div className="pt-40 pb-32 px-6 bg-white dark:bg-slate-950 transition-colors duration-500 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="text-center space-y-8">
           <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none dark:text-white">Empire <span className="text-gradient">Pricing.</span></h1>
           <div className="flex justify-center gap-4">
              {currencyOptions.map(c => (
                <button 
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${currency === c ? 'bg-brand text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-500'}`}
                >
                  {c}
                </button>
              ))}
           </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {proPlans.map(plan => (
            <div key={plan.name} className={`p-12 rounded-[3.5rem] border flex flex-col relative ${plan.popular ? 'bg-slate-900 dark:bg-slate-900 border-brand shadow-2xl scale-105 z-10' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'}`}>
              {plan.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</span>}
              <h3 className={`text-2xl font-black mb-8 uppercase tracking-widest ${plan.popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-10">
                 <span className={`text-5xl font-black ${plan.popular ? 'text-brand' : 'text-slate-900 dark:text-white'}`}>{!Number.isNaN(plan.usd) ? currentSym : ''}{fmt(plan.usd)}</span>
                 {!Number.isNaN(plan.usd) && <span className="text-slate-500 text-[10px] font-black uppercase">/ month</span>}
              </div>
              <ul className="space-y-5 flex-1 mb-12">
                 {plan.features.map(f => (
                   <li key={f} className="flex items-center gap-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                     <i className="fas fa-check-circle text-brand"></i> {f}
                   </li>
                 ))}
              </ul>
              <button className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${plan.popular ? 'bg-brand text-white shadow-xl shadow-brand/30' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'}`}>
                Engage Plan
              </button>
            </div>
          ))}
        </div>

        {/* Open Source Pricing BRS 6.5.2 */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-16 rounded-[4rem] border border-slate-200 dark:border-slate-800 text-center space-y-10">
           <h3 className="text-3xl font-black dark:text-white">Open-Source Support & Migration</h3>
           <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Migration', cost: 'FREE', desc: 'Switch from any provider at zero cost.' },
                { title: 'Asterisk Setup', cost: '₹2,500', desc: 'One-time expert configuration.' },
                { title: 'Managed Hosting', cost: '₹1,499/mo', desc: 'Enterprise uptime for VICIdial.' }
              ].map(s => (
                <div key={s.title} className="p-8 bg-white dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-black uppercase text-slate-500 mb-2">{s.title}</p>
                  <h4 className="text-2xl font-black text-brand mb-4">{s.cost}</h4>
                  <p className="text-xs font-medium text-slate-500">{s.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
