
import React from 'react';
import Logo from '../Logo';
import { AppView } from '../types';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-20 px-4 transition-all duration-500">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-16">
        <div className="space-y-8">
          <div className="cursor-pointer" onClick={() => onNavigate(AppView.HOME)}>
            <Logo size="sm" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed max-w-xs">
            <strong>Proautodial Telephony services pvt ltd</strong> is a global leader in high-performance communication architectures, from legacy open-source clusters to neural-native nodes.
          </p>
          <div className="space-y-2">
            <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Global Hotline</p>
            <a href="tel:+918898724365" className="text-xl font-black text-brand hover:underline">+91-8898-7-24-365</a>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Presence</p>
            <a href="https://www.proautodial.in" className="text-sm font-bold text-brand hover:underline">www.proautodial.in</a>
          </div>
        </div>
        
        <div>
          <h4 className="font-black text-slate-900 dark:text-white mb-8 uppercase tracking-widest text-xs">Tactical Support Hubs</h4>
          <div className="space-y-6 text-sm font-bold text-slate-500 dark:text-slate-400">
            <div className="flex items-start gap-4">
              <i className="fas fa-location-dot text-brand mt-1"></i>
              <div>
                <p className="text-slate-900 dark:text-white uppercase text-[10px] font-black">India HQ</p>
                <p className="font-medium mt-1">Hyderabad, Telangana</p>
                <p className="text-[10px] text-brand">Main Engineering Node</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <i className="fas fa-location-dot text-brand mt-1"></i>
              <div>
                <p className="text-slate-900 dark:text-white uppercase text-[10px] font-black">International Hub</p>
                <p className="font-medium mt-1">San Francisco, California</p>
                <p className="text-[10px] text-brand">24/7 Monitoring Active</p>
              </div>
            </div>
          </div>
        </div>

        {[
          { title: 'Open Source Support', links: [
            {label: 'Vicidial v11 Installation', view: AppView.VICIDIAL_V11}, 
            {label: 'Goautodial v4 Migration', view: AppView.GOAUTODIAL_V4}, 
            {label: 'Asterisk Dialplan Design', view: AppView.ASTERISK_DESIGN}, 
            {label: 'FreePBX/Issabel Setup', view: AppView.FREEPBX_SETUP}
          ]},
          { title: 'Strategic Assets', links: [
            {label: 'CRM Integration Hub', view: AppView.SOLUTIONS}, 
            {label: 'API Reference Node', view: AppView.RESOURCES}, 
            {label: 'Case Study Repository', view: AppView.CASE_STUDIES}, 
            {label: 'Managed VoIP Hosting', view: AppView.MANAGED_HOSTING}
          ]}
        ].map((col, i) => (
          <div key={i}>
            <h4 className="font-black text-slate-900 dark:text-white mb-8 uppercase tracking-widest text-xs">{col.title}</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
              {col.links.map(link => (
                <li key={link.label}>
                  <button 
                    onClick={() => onNavigate(link.view)}
                    className="hover:text-brand transition-colors flex items-center gap-2 group text-left"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-brand transition-all"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">
          © 2024 Proautodial Telephony services pvt ltd. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">
           <button onClick={() => onNavigate(AppView.TERMS)} className="hover:text-brand transition-colors">Terms</button>
           <button onClick={() => onNavigate(AppView.PRIVACY_POLICY)} className="hover:text-brand transition-colors">Privacy Policy</button>
           <button onClick={() => onNavigate(AppView.REFUND_POLICY)} className="hover:text-brand transition-colors">Refund Policy</button>
           <button onClick={() => onNavigate(AppView.DISCLAIMER)} className="hover:text-brand transition-colors">Disclaimer</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
