
import React from 'react';
import { CLIENTS } from '../data/clients';

const ClientWall: React.FC = () => {
  const clients = CLIENTS;

  const slugify = (s: string) =>
    s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const LogoBox: React.FC<{ slug: string; name: string }> = ({ slug, name }) => {
    const candidates = React.useMemo(() => [
      `/clients/${slug}.svg`,
      `/clients/${slug}.png`,
      `/clients/${slug}.jpg`,
      `/clients/${slug}.jpeg`,
    ], [slug]);
    const [idx, setIdx] = React.useState(0);
    return (
      <img
        src={candidates[idx]}
        alt={`${name} logo`}
        className="max-w-full max-h-full object-contain"
        loading="lazy"
        onError={(e) => {
          if (idx < candidates.length - 1) {
            setIdx(i => i + 1);
          } else {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=DB5D43&color=fff`;
          }
        }}
      />
    );
  };

  return (
    <section className="py-32 bg-white dark:bg-slate-950 overflow-hidden relative border-y border-slate-100 dark:border-slate-900 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4 animate-fade-in-up">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand">Strategic Implementation Base</h3>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight dark:text-white leading-none">Trusted by <br /><span className="text-gradient">Industry Architects.</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed">
            Powering high-fidelity communications for domestic giants and international corridor leaders.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-1000">
          {clients.map((c, i) => {
            const slug = (c as any).slug ? (c as any).slug : slugify(c.name);
            return (
            <div key={i} className="group relative flex flex-col items-center text-center space-y-3 hover:scale-105 transition-all duration-500">
               <div className="w-40 h-20 md:w-48 md:h-24 bg-white dark:bg-slate-900 rounded-3xl flex items-center justify-center p-4 border border-slate-100 dark:border-slate-800 shadow-sm group-hover:border-brand/40 group-hover:shadow-2xl transition-all overflow-hidden">
                  <LogoBox slug={slug} name={c.name} />
               </div>
               <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-brand text-white text-[8px] font-black px-3 py-1.5 rounded-full whitespace-nowrap z-10 shadow-xl border border-brand/50">
                  {c.focus}
               </div>
            </div>
          )})}
        </div>
      </div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand/5 rounded-full blur-[100px] pointer-events-none"></div>
    </section>
  );
};

export default ClientWall;
