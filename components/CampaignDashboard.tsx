
import React, { useState } from 'react';
import { Campaign } from '../types';

const CampaignDashboard: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>('camp-1');

  const campaigns: Campaign[] = [
    {
      id: 'camp-1',
      name: 'Global Real Estate Outreach',
      status: 'active',
      concurrency: 450,
      leadsProcessed: 12400,
      qualifiedCount: 1840,
      startTime: '2024-10-01',
      stats: {
        conversionRate: 14.8,
        avgCallDuration: 184,
        roi: 4.2,
        agentPerformanceScore: 92,
        totalCalls: 125000,
        leadsQualified: 18500
      }
    },
    {
      id: 'camp-2',
      name: 'B2B Tech Subscription Renewal',
      status: 'active',
      concurrency: 200,
      leadsProcessed: 8900,
      qualifiedCount: 1120,
      startTime: '2024-11-15',
      stats: {
        conversionRate: 12.5,
        avgCallDuration: 210,
        roi: 3.8,
        agentPerformanceScore: 88,
        totalCalls: 45000,
        leadsQualified: 5600
      }
    }
  ];

  const current = campaigns.find(c => c.id === selectedCampaign) || campaigns[0];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-slate-950 text-white transition-colors duration-500">
      <div className="max-w-[1600px] mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter">Campaign <span className="text-brand">Analytics</span></h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Deep Metric Tracking & AI Optimization</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex gap-2">
               {campaigns.map(c => (
                 <button 
                  key={c.id}
                  onClick={() => setSelectedCampaign(c.id)}
                  className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${selectedCampaign === c.id ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                 >
                   {c.name}
                 </button>
               ))}
            </div>
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
               <i className="fas fa-plus"></i> New Campaign
            </button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Conversion Rate', value: `${current.stats.conversionRate}%`, icon: 'fa-chart-pie', color: 'text-brand', trend: '+2.4%' },
            { label: 'Avg Call Duration', value: `${current.stats.avgCallDuration}s`, icon: 'fa-clock', color: 'text-blue-500', trend: '-12s' },
            { label: 'Campaign ROI', value: `${current.stats.roi}x`, icon: 'fa-money-bill-trend-up', color: 'text-emerald-500', trend: '+0.5x' },
            { label: 'Agent Performance', value: `${current.stats.agentPerformanceScore}/100`, icon: 'fa-star', color: 'text-amber-500', trend: '+4 pts' },
          ].map((s, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-brand/40 transition-all">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                 <i className={`fas ${s.icon} text-6xl`}></i>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{s.label}</p>
              <div className="flex items-baseline gap-4">
                <h3 className="text-4xl font-black tracking-tight">{s.value}</h3>
                <span className={`text-[10px] font-black ${s.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{s.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Visualization */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-[3rem] p-12 space-y-10">
            <div className="flex justify-between items-center">
               <h2 className="text-2xl font-black">Lead Qualification Funnel</h2>
               <select className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:border-brand">
                 <option>Last 30 Days</option>
                 <option>Last 7 Days</option>
               </select>
            </div>
            
            <div className="space-y-8">
               {[
                 { label: 'Total Leads Initialized', count: current.stats.totalCalls, width: '100%', color: 'bg-slate-700' },
                 { label: 'Successful Connections', count: current.stats.totalCalls * 0.45, width: '45%', color: 'bg-blue-600' },
                 { label: 'AI Interaction Completed', count: current.stats.totalCalls * 0.22, width: '22%', color: 'bg-indigo-600' },
                 { label: 'Qualified (Hot Leads)', count: current.stats.leadsQualified, width: '15%', color: 'bg-brand' }
               ].map((step, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                      <span className="text-slate-400">{step.label}</span>
                      <span>{step.count.toLocaleString()}</span>
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${step.color} transition-all duration-1000`} style={{ width: step.width }}></div>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-12 flex flex-col justify-between">
            <div className="space-y-8">
              <h2 className="text-2xl font-black">AI Sentiment Matrix</h2>
              <div className="relative aspect-square bg-slate-950 rounded-[2rem] border border-slate-800 flex items-center justify-center p-8 overflow-hidden">
                 <div className="absolute inset-0 bg-brand/5 animate-pulse"></div>
                 <div className="relative z-10 text-center space-y-4">
                    <div className="text-6xl text-brand font-black">84%</div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Positive Intent Detection</p>
                    <div className="flex gap-2 justify-center">
                       <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                       <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                       <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                       <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                    </div>
                 </div>
              </div>
              <p className="text-sm text-slate-400 font-medium italic">
                "Our neural engine detected higher receptivity during 10:00 AM - 11:30 AM local time for this segment."
              </p>
            </div>
            <button className="w-full py-5 bg-brand text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:brightness-110 shadow-xl shadow-brand/20 transition-all mt-8">
              View AI Strategy Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDashboard;
