
import React, { useState } from 'react';

interface LegacyAgentLoginProps {
  onLogin: () => void;
}

const LegacyAgentLogin: React.FC<LegacyAgentLoginProps> = ({ onLogin }) => {
  const [phoneLogin, setPhoneLogin] = useState('');
  const [phonePassword, setPhonePassword] = useState('');
  const [userLogin, setUserLogin] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [campaign, setCampaign] = useState('TESTCAMP');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneLogin || !phonePassword || !userLogin || !userPassword) {
      setError('All fields are required');
      return;
    }
    // Simulate login
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans bg-[#015b91]" style={{ backgroundImage: 'url(/legacy/images/bg.jpg)' }}>
      <div className="bg-white p-8 rounded-lg shadow-2xl w-[400px] border-4 border-[#003366]">
        <div className="text-center mb-6">
          <img src="/legacy/images/goautodial_logo.png" alt="GoAutoDial" className="mx-auto h-16 mb-2" onError={(e) => e.currentTarget.src = 'https://placehold.co/200x60?text=Vicidial+Legacy'} />
          <h2 className="text-[#003366] font-bold text-xl">Agent Login</h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="border-b pb-4 mb-4">
            <h3 className="text-sm font-bold text-gray-700 mb-2 uppercase border-b border-gray-200 pb-1">Phone Login</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <label className="w-24 text-xs font-bold text-gray-600">Phone Login:</label>
                <input 
                  type="text" 
                  value={phoneLogin}
                  onChange={(e) => setPhoneLogin(e.target.value)}
                  className="flex-1 border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:border-[#003366]"
                />
              </div>
              <div className="flex items-center">
                <label className="w-24 text-xs font-bold text-gray-600">Phone Pass:</label>
                <input 
                  type="password" 
                  value={phonePassword}
                  onChange={(e) => setPhonePassword(e.target.value)}
                  className="flex-1 border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:border-[#003366]"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-2 uppercase border-b border-gray-200 pb-1">User Login</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <label className="w-24 text-xs font-bold text-gray-600">User Login:</label>
                <input 
                  type="text" 
                  value={userLogin}
                  onChange={(e) => setUserLogin(e.target.value)}
                  className="flex-1 border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:border-[#003366]"
                />
              </div>
              <div className="flex items-center">
                <label className="w-24 text-xs font-bold text-gray-600">User Pass:</label>
                <input 
                  type="password" 
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  className="flex-1 border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:border-[#003366]"
                />
              </div>
              <div className="flex items-center">
                <label className="w-24 text-xs font-bold text-gray-600">Campaign:</label>
                <select 
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                  className="flex-1 border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:border-[#003366]"
                >
                  <option value="TESTCAMP">TESTCAMP - Test Campaign</option>
                  <option value="SALES">SALES - Outbound Sales</option>
                  <option value="SUPPORT">SUPPORT - Inbound Support</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit"
              className="bg-[#003366] text-white px-6 py-2 rounded font-bold text-sm hover:bg-[#002244] shadow-md transition-colors"
            >
              SUBMIT
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-[10px] text-gray-400">
          VERSION: 2.14-585a <br/>
          BUILD: 200409-1138 <br/>
          &copy; 2021 ViciDial Group
        </div>
      </div>
    </div>
  );
};

export default LegacyAgentLogin;
