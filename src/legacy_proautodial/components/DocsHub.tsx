
import React, { useState } from 'react';

const DocsHub: React.FC = () => {
  const [search, setSearch] = useState('');

  const sections = [
    {
      title: 'Authentication',
      content: 'ProAutoDial uses API key authentication to secure access to our APIs. This straightforward approach allows you to quickly integrate our voice AI capabilities into your applications while maintaining security.',
      code: `const options = {
  method: 'GET',
  headers: { 'X-API-KEY': 'your-api-key-here' }
};

fetch('https://api.proautodial.ai/v1/workspace', options)
  .then(response => response.json())
  .catch(error => console.error(error));`
    },
    {
      title: 'Voice Calling',
      content: 'Initiate high-fidelity outbound calls using our neural engine. You can specify assistant IDs, callee numbers, and custom metadata for CRM tracking.',
      code: `POST /v1/calls/initiate
{
  "assistant_id": "asst_12345",
  "phone_number": "+919876543210",
  "metadata": { "lead_id": "L-001" }
}`
    },
    {
      title: 'Webhooks Setup',
      content: 'Register endpoints to receive real-time updates on call status, transcription completions, and qualified lead events.',
      code: `POST /v1/webhooks
{
  "url": "https://your-crm.com/api/proautodial-hook",
  "events": ["call.completed", "lead.qualified"]
}`
    }
  ];

  const filteredSections = sections.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex bg-slate-950 text-white animate-fade-in">
      {/* Table of Contents */}
      <aside className="w-72 border-r border-slate-900 p-10 space-y-8 sticky top-0 h-[calc(100vh-5rem)] overflow-y-auto custom-scrollbar bg-slate-950/50">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase text-brand tracking-[0.3em]">Neural Manual</p>
            <h2 className="text-xl font-black">Architecture</h2>
          </div>
          <div className="relative">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-xs"></i>
            <input 
              type="text"
              placeholder="Search Manual..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-[10px] font-bold outline-none focus:border-brand transition-all"
            />
          </div>
        </div>
        <nav className="space-y-4">
          {['Get Started', 'Authentication', 'Voice Calling', 'Batch Campaigns', 'Webhooks', 'Compliance'].map(item => (
            <button key={item} className={`w-full text-left py-2 px-4 rounded-xl text-xs font-bold transition-all ${search && item.toLowerCase().includes(search.toLowerCase()) ? 'bg-brand/10 text-brand' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-16 space-y-20 max-w-5xl mx-auto overflow-y-auto">
        <div className="space-y-6">
          <h1 className="text-6xl font-black tracking-tighter">API Reference</h1>
          <p className="text-xl text-slate-400 font-medium leading-relaxed">
            Welcome to the ProAutoDial developer experience. Our API allows you to programmatically manage your AI assistants, phone numbers, and communication history.
          </p>
        </div>

        {filteredSections.length > 0 ? filteredSections.map((s, i) => (
          <section key={i} className="space-y-8 scroll-mt-32" id={s.title.toLowerCase()}>
            <div className="space-y-4">
              <h3 className="text-3xl font-black">{s.title}</h3>
              <p className="text-slate-400 leading-relaxed font-medium">{s.content}</p>
            </div>
            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-inner relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <i className="fas fa-code text-6xl"></i>
              </div>
              <button className="absolute top-6 right-6 p-3 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all hover:bg-brand">Copy Code</button>
              <pre className="text-emerald-400 font-mono text-sm leading-relaxed overflow-x-auto">
                {s.code}
              </pre>
            </div>
          </section>
        )) : (
          <div className="py-24 text-center space-y-4">
             <i className="fas fa-book-open-reader text-6xl text-slate-800"></i>
             <p className="text-xl font-bold text-slate-500">No matching documentation found.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DocsHub;
