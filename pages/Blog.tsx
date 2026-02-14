
import React, { useState } from 'react';
import AIImage from '../components/AIImage';

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Strategic Insights', 'Vicidial Tutorials', 'Resource Vault'];

  const posts = [
    {
      title: 'Proautodial Enterprise: Multi-Server Orchestration',
      category: 'Vicidial Tutorials',
      date: 'Dec 12, 2024',
      desc: 'Step-by-step architecture for scaling Vicidial clusters across multiple physical or cloud nodes. Essential for 100+ concurrent agents.',
      icon: 'fa-server',
      prompt: 'High-tech server rack architecture, glowing orange data cables, professional aesthetic, blue and coral theme'
    },
    {
      title: 'Strategic Management: Maximizing Agent Throughput',
      category: 'Strategic Insights',
      date: 'Nov 28, 2024',
      desc: 'How Proautodial Telephony services pvt ltd recommends optimizing list ratios and wait times without sacrificing lead quality.',
      icon: 'fa-chart-mixed',
      prompt: 'Futuristic business growth charts, holographic interface, corporate office, cinematic lighting'
    },
    {
      title: 'Custom UI Architectures for High-Velocity Agents',
      category: 'Vicidial Tutorials',
      date: 'Oct 15, 2024',
      desc: 'Customizing the Vicidial agent screen using Proautodial styling nodes to reduce cognitive load and increase closing rates.',
      icon: 'fa-desktop',
      prompt: 'Clean modern computer desktop interface showing call center stats, soft lighting, professional'
    },
    {
      title: 'DNC Compliance Guide 2025: Operational Standards',
      category: 'Strategic Insights',
      date: 'Sep 05, 2024',
      desc: 'Navigating global regulatory landscapes. How Proautodial built-in DNC nodes protect your operation from litigation.',
      icon: 'fa-shield-check',
      prompt: 'Shield motif made of digital data, security focus, coral and grey tones'
    },
    {
      title: 'Managed Dialer Software: Performance Benchmarks',
      category: 'Resource Vault',
      date: 'Aug 20, 2024',
      desc: 'Download our 2024 efficiency report comparing managed cloud dialers vs. legacy on-premise clusters.',
      icon: 'fa-file-pdf',
      prompt: 'Professional whitepaper document floating in a digital void, high-end 3D'
    },
    {
      title: 'v4 Migration: Scaling Goautodial Nodes',
      category: 'Vicidial Tutorials',
      date: 'Jul 12, 2024',
      desc: 'Technical walkthrough for upgrading legacy Goautodial v2/v3 installs to modern v4 Proautodial nodes.',
      icon: 'fa-rocket',
      prompt: 'Rocket taking off from a digital circuit board, high speed data trail'
    }
  ];

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  return (
    <div className="pt-24 animate-fade-in bg-slate-50 dark:bg-slate-950 transition-all duration-500">
      {/* Blog Hero */}
      <section className="py-32 px-6 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/10 rounded-full blur-[140px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-brand/10 text-brand font-black text-[10px] uppercase tracking-widest border border-brand/20 mx-auto">
             Strategic Intel Node
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">Proautodial <span className="text-gradient not-italic">Intel.</span></h1>
          <p className="text-2xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
            Technical guides, industry breakthroughs, and resource downloads for the modern telephony architect.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-24 z-[50] shadow-sm transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-4 items-center justify-center">
           {categories.map(cat => (
             <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-brand text-white shadow-xl' : 'bg-slate-100 dark:bg-slate-950 text-slate-500 hover:text-brand'}`}
             >
               {cat}
             </button>
           ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
             {filteredPosts.map((post, i) => (
               <article key={i} className="group bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-3">
                  <div className="h-64 relative overflow-hidden">
                     <AIImage prompt={post.prompt} className="w-full h-full group-hover:scale-110 transition-transform duration-[2s]" />
                     <div className="absolute inset-0 bg-brand/5 group-hover:bg-transparent transition-colors"></div>
                     <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-xl text-[9px] font-black uppercase tracking-widest text-brand border border-brand/20">
                        {post.category}
                     </div>
                  </div>
                  
                  <div className="p-10 space-y-6">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{post.date}</p>
                     <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-brand transition-colors">{post.title}</h3>
                     <p className="text-sm text-slate-500 font-medium leading-relaxed">{post.desc}</p>
                     
                     <div className="pt-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                        <button className="text-[10px] font-black text-brand uppercase tracking-[0.3em] flex items-center gap-3 group/btn hover:gap-5 transition-all">
                           Read Manual <i className="fas fa-arrow-right"></i>
                        </button>
                        <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-400 group-hover:text-brand transition-colors">
                           <i className={`fas ${post.icon}`}></i>
                        </div>
                     </div>
                  </div>
               </article>
             ))}
           </div>
           
           {filteredPosts.length === 0 && (
             <div className="py-40 text-center space-y-6 opacity-30">
                <i className="fas fa-satellite text-[8rem] animate-pulse"></i>
                <p className="text-xl font-black uppercase tracking-[0.3em]">No articles found in this node.</p>
             </div>
           )}
        </div>
      </section>

      {/* Newsletter Node */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-950 rounded-[4rem] p-12 md:p-24 text-center space-y-10 relative overflow-hidden border border-brand/20">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] pointer-events-none"></div>
             <div className="space-y-4 relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic">Subscribe to the <span className="text-brand">Node.</span></h2>
                <p className="text-slate-400 font-medium max-w-xl mx-auto">Get exclusive Vicidial optimization scripts and Proautodial AI updates delivered to your endpoint.</p>
             </div>
             
             <form className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 relative z-10" onSubmit={e => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="name@enterprise.com" 
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-8 py-5 text-white font-bold outline-none focus:border-brand transition-all shadow-inner"
                />
                <button className="px-12 py-5 bg-brand text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl shadow-brand/40 hover:brightness-110 active:scale-95 transition-all">Connect</button>
             </form>
             
             <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest relative z-10">Secured by Proautodial Telephony services pvt ltd • No Spam Protocol</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
