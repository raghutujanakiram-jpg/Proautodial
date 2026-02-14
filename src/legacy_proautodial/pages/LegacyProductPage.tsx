
import React, { useState } from 'react';
import LegacyAgentLogin from '../components/legacy/LegacyAgentLogin';
import LegacyAgentDashboard from '../components/legacy/LegacyAgentDashboard';

const LegacyProductPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="relative z-[500] h-screen w-full overflow-hidden bg-white">
      {/* 
        This page takes over the full screen to simulate the legacy app environment.
        It sits on top of the main app navigation in a way (conceptually), 
        but in our routing it will be a standard page.
        However, the legacy app has its own internal navigation and layout.
      */}
      {isLoggedIn ? (
        <LegacyAgentDashboard onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <LegacyAgentLogin onLogin={() => setIsLoggedIn(true)} />
      )}
      
      {/* Escape hatch to return to main site */}
      <a 
        href="#/" 
        className="fixed bottom-4 right-4 bg-black/50 hover:bg-black/80 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm transition-all z-[1000]"
        onClick={() => setIsLoggedIn(false)}
      >
        Exit Legacy Mode
      </a>
    </div>
  );
};

export default LegacyProductPage;
