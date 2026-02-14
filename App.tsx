
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import AIVoiceAgents from './pages/AIVoiceAgents';
import Solutions from './pages/Solutions';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Resources from './pages/Resources';
import Blog from './pages/Blog';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CallCenterSolution from './pages/CallCenterSolution';
import SupportCenter from './pages/SupportCenter';
import LegalPage from './pages/LegalPage';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardHeader from './components/DashboardHeader';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import StrategicHub from './components/StrategicHub';
import VoiceAgentsService from './components/VoiceAgentsService';
import AgentDesktop from './components/AgentDesktop';
import CampaignDashboard from './components/CampaignDashboard';
import KnowledgeForge from './components/KnowledgeForge';
import ProfileSettings from './components/ProfileSettings';
import AssistantManager from './components/AssistantManager';
import WhatsAppButton from './components/WhatsAppButton';
import Chatbot from './components/Chatbot';
import BookDemo from './components/BookDemo';
import { AppView, UserProfile, Notification } from './types';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Strategic Lead',
    email: 'ops@enterprise.com',
    avatar: 'https://i.pravatar.cc/150?u=strategic',
    language: 'English (US)',
    timezone: 'UTC+5:30 (IST)'
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', type: 'success', title: 'System Ready', message: 'Neural link established successfully.', timestamp: 'Now', read: false }
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const isPortalMode = [
    AppView.PORTAL_DASHBOARD, AppView.PORTAL_HUB, AppView.HUB, AppView.PORTAL_VOICE_LAB, AppView.VOICE_LAB,
    AppView.PORTAL_CAMPAIGNS, AppView.CAMPAIGNS, AppView.PORTAL_KNOWLEDGE, AppView.KNOWLEDGE_BASE, 
    AppView.PORTAL_PROFILE, AppView.PROFILE, AppView.AGENT_DESKTOP
  ].includes(currentView);

  const renderPublicView = () => {
    switch(currentView) {
      case AppView.HOME: return <Home onNavigate={setCurrentView} />;
      case AppView.SOLUTIONS: return <Solutions onNavigate={setCurrentView} />;
      case AppView.AI_VOICE_AGENTS: return <AIVoiceAgents />;
      case AppView.SERVICES: return <Services onNavigate={setCurrentView} />;
      case AppView.PRICING: return <Pricing />;
      case AppView.RESOURCES: return <Resources onNavigate={setCurrentView} />;
      case AppView.BLOG: return <Blog />;
      case AppView.ABOUT: return <About />;
      case AppView.CAREERS: return <Careers />;
      case AppView.CONTACT: return <Contact />;
      case AppView.CASE_STUDIES: return <CaseStudiesPage />;
      case AppView.BOOK_DEMO: return <BookDemo />;
      case AppView.SUPPORT_CENTER: return <SupportCenter onNavigate={setCurrentView} />;
      
      // Legal Routes
      case AppView.TERMS: return <LegalPage type="terms" />;
      case AppView.PRIVACY_POLICY: return <LegalPage type="privacy" />;
      case AppView.REFUND_POLICY: return <LegalPage type="refund" />;
      case AppView.DISCLAIMER: return <LegalPage type="disclaimer" />;

      // Specialized Flagship Product
      case AppView.VIRTUAL_CALL_CENTER:
        return <CallCenterSolution onNavigate={setCurrentView} />;

      // Specialized Legacy Engineering Detailed Routes
      case AppView.VICIDIAL_V11:
        return <ProductDetailPage type="Vicidial v11 Installation" onNavigate={setCurrentView} />;
      case AppView.GOAUTODIAL_V4:
        return <ProductDetailPage type="Goautodial v4 Migration" onNavigate={setCurrentView} />;
      case AppView.ASTERISK_DESIGN:
        return <ProductDetailPage type="Asterisk Dialplan Design" onNavigate={setCurrentView} />;
      case AppView.FREEPBX_SETUP:
        return <ProductDetailPage type="FreePBX / Issabel Setup" onNavigate={setCurrentView} />;

      // Technical Product Detail Routes
      case AppView.AUTO_DIALER: 
        return <ProductDetailPage type="Auto Dialer" onNavigate={setCurrentView} />;
      case AppView.VOICE_BROADCASTING:
        return <ProductDetailPage type="Voice Broadcasting" onNavigate={setCurrentView} />;
      case AppView.VIRTUAL_PHONE_SYSTEM:
        return <ProductDetailPage type="Virtual Phone System" onNavigate={setCurrentView} />;
      case AppView.PREDICTIVE_DIALER:
        return <ProductDetailPage type="Predictive Dialer" onNavigate={setCurrentView} />;
      case AppView.VICIDIAL_MASTERY:
        return <ProductDetailPage type="Vicidial Mastery" onNavigate={setCurrentView} />;
      case AppView.MANAGED_HOSTING:
        return <ProductDetailPage type="Managed Hosting" onNavigate={setCurrentView} />;
      case AppView.ROBO_DIALER:
        return <ProductDetailPage type="Robo Dialer" onNavigate={setCurrentView} />;
      case AppView.HOURLY_SUPPORT:
        return <ProductDetailPage type="Hourly Support" onNavigate={setCurrentView} />;
      case AppView.DEDICATED_TECH:
        return <ProductDetailPage type="Dedicated Tech Person" onNavigate={setCurrentView} />;
        
      default: return <Home onNavigate={setCurrentView} />;
    }
  };

  const renderPortalView = () => {
    switch(currentView) {
      case AppView.PORTAL_DASHBOARD: return <ExecutiveDashboard />;
      case AppView.PORTAL_HUB: 
      case AppView.HUB:
        return <AssistantManager />;
      case AppView.PORTAL_VOICE_LAB:
      case AppView.VOICE_LAB:
        return <VoiceAgentsService />;
      case AppView.PORTAL_CAMPAIGNS:
      case AppView.CAMPAIGNS:
        return <CampaignDashboard />;
      case AppView.PORTAL_KNOWLEDGE:
      case AppView.KNOWLEDGE_BASE:
        return <KnowledgeForge />;
      case AppView.PORTAL_PROFILE:
      case AppView.PROFILE:
        return <ProfileSettings profile={userProfile} onSave={setUserProfile} />;
      case AppView.AGENT_DESKTOP:
        return <AgentDesktop />;
      default: return <ExecutiveDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0E14] text-slate-900 dark:text-white transition-colors duration-500 selection:bg-brand/30 overflow-x-hidden">
      {isPortalMode ? (
        <div className="flex min-h-screen">
          <DashboardSidebar currentView={currentView} onNavigate={setCurrentView} user={userProfile} />
          <div className="flex-1 flex flex-col min-w-0">
            <DashboardHeader 
              onNavigate={setCurrentView} 
              user={userProfile} 
              notifications={notifications}
              onClearNotifications={() => setNotifications([])}
            />
            <main className="flex-1 overflow-y-auto custom-scrollbar">
              {renderPortalView()}
            </main>
          </div>
        </div>
      ) : (
        <>
          <Navigation 
            currentView={currentView} 
            onNavigate={setCurrentView} 
            isDarkMode={true}
          />
          {renderPublicView()}
          <Footer onNavigate={setCurrentView} />
        </>
      )}
      <WhatsAppButton />
      <Chatbot />
    </div>
  );
}

export default App;
