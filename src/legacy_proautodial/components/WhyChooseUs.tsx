
import React from 'react';

const WhyChooseUs: React.FC = () => {
  const points = [
    {
      title: 'Cost savings',
      description: 'Our effective processes and knowledgeable personnel will save you thousands of dollars.',
      icon: 'fa-chart-line-up'
    },
    {
      title: 'Immediate Response',
      description: 'Emergency response time is guaranteed to be one hour or less.',
      icon: 'fa-headset'
    },
    {
      title: '24x7 Service',
      description: 'Proactive monitoring and assistance to ensure you have "zero downtime" and alleviate your IT headaches.',
      icon: 'fa-clock-rotate-left'
    },
    {
      title: 'Partner-in-Implementation',
      description: '1100+ successful project implementations on time and under budget in the previous eight years.',
      icon: 'fa-microchip-ai'
    },
    {
      title: 'Customer-Centric',
      description: 'We have over 400 + repeat clients with connections spanning decades.',
      icon: 'fa-users-viewfinder'
    },
    {
      title: 'Committed Workforce',
      description: 'A team of over 200 people dedicated to client success.',
      icon: 'fa-people-group'
    },
    {
      title: 'Digital Transformation',
      description: 'With extensive knowledge in the cloud, data, and applications.',
      icon: 'fa-cloud-bolt'
    },
    {
      title: 'Core Business Objectives',
      description: 'With over 15 years of expertise in the field, we focus on core business goals.',
      icon: 'fa-bullseye-arrow'
    },
    {
      title: '100% Client Satisfaction',
      description: 'We want you to be fully happy with our tech support and will go to any effort to ensure the same.',
      icon: 'fa-face-smile-wink'
    },
    {
      title: 'Heroic Support',
      description: 'Get quick online support from industry best support people.',
      icon: 'fa-user-shield'
    }
  ];

  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 space-y-6 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Why Choose Us ?
          </h2>
          <div className="w-16 h-1 bg-brand mx-auto rounded-full"></div>
          <p className="text-slate-500 dark:text-slate-400 max-w-4xl mx-auto text-lg font-medium leading-relaxed">
            If you are in search for all-in-one IT infrastructure solutions with 24*7 support, you will hire us! Automation can't be as responsive, helpful, or dedicated as humans can. ProAutoDial is the right solution for you. We are here to help you with monitoring your servers, reducing risk, and improving overall performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {points.map((point, idx) => (
            <div 
              key={idx} 
              className="group flex items-center justify-between p-8 bg-white dark:bg-slate-900 rounded-xl shadow-sm border-l-4 border-brand hover:shadow-xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Glossy Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              
              <div className="flex-1 pr-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-brand transition-colors">
                  {point.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                  {point.description}
                </p>
              </div>
              
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                 <i className={`fas ${point.icon} text-4xl text-brand opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500`}></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
