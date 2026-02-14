
import React, { useState, useEffect } from 'react';

interface LegacyAgentDashboardProps {
  onLogout: () => void;
}

const LegacyAgentDashboard: React.FC<LegacyAgentDashboardProps> = ({ onLogout }) => {
  const [status, setStatus] = useState('PAUSED');
  const [customerInfo, setCustomerInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    address1: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    zip: '62704',
    phone: '5551234567',
    altPhone: '',
    email: 'john.doe@example.com',
    comments: 'Interested in product A'
  });
  const [activeTab, setActiveTab] = useState<'info' | 'script' | 'form'>('info');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#E0E0E0] font-sans text-xs">
      {/* Top Header */}
      <div className="bg-[#003366] text-white p-1 flex justify-between items-center border-b-2 border-white">
        <div className="flex items-center gap-2">
          <span className="font-bold text-yellow-300 px-2">VICIDIAL</span>
          <span className="text-[10px]">VERSION: 2.14-585a</span>
        </div>
        <div className="flex items-center gap-4 px-2">
          <div className="bg-black border border-gray-500 px-2 py-0.5 font-mono text-green-400">
            {time.toLocaleTimeString()}
          </div>
          <div className={`px-2 py-0.5 font-bold ${status === 'PAUSED' ? 'bg-yellow-500 text-black' : 'bg-green-600'}`}>
            STATUS: {status}
          </div>
          <div>SESSION ID: 8600051</div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar Controls */}
        <div className="w-40 bg-[#D0D0D0] border-r border-white flex flex-col p-1 gap-1 overflow-y-auto">
           <div className="bg-white border border-gray-400 p-1 text-center font-bold text-[#003366] mb-2">
             AGENT CONTROLS
           </div>
           
           <button className="w-full mb-1"><img src="/legacy/images/vdc_LB_dialnextnumber.gif" alt="Dial Next" /></button>
           <button className="w-full mb-1"><img src="/legacy/images/vdc_LB_hangupcustomer.gif" alt="Hangup" /></button>
           <button className="w-full mb-1"><img src="/legacy/images/vdc_LB_parkcall.gif" alt="Park Call" /></button>
           <button className="w-full mb-1"><img src="/legacy/images/vdc_LB_transferconf.gif" alt="Transfer" /></button>
           <button className="w-full mb-1"><img src="/legacy/images/vdc_LB_startrecording.gif" alt="Record" /></button>
           <button className="w-full mb-1"><img src="/legacy/images/vdc_LB_webform.gif" alt="Web Form" /></button>
           
           <div className="mt-auto border-t border-gray-400 pt-2">
             <div className="text-[10px] text-center font-bold text-gray-600 mb-1">VOLUME CONTROL</div>
             <div className="flex justify-center gap-1">
               <img src="/legacy/images/vdc_volume_down.gif" alt="Vol Down" className="cursor-pointer" />
               <img src="/legacy/images/vdc_volume_up.gif" alt="Vol Up" className="cursor-pointer" />
             </div>
             <div className="flex justify-center mt-1">
               <img src="/legacy/images/vdc_volume_MUTE.gif" alt="Mute" className="cursor-pointer" />
             </div>
           </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-[#F0F0F0] p-1">
          {/* Tabs */}
          <div className="flex border-b border-gray-400 mb-1">
            <button 
              className={`px-4 py-1 font-bold rounded-t mr-1 ${activeTab === 'info' ? 'bg-white border-t border-l border-r border-gray-400 z-10' : 'bg-[#D0D0D0] text-gray-600'}`}
              onClick={() => setActiveTab('info')}
            >
              VICIDIAL
            </button>
            <button 
              className={`px-4 py-1 font-bold rounded-t mr-1 ${activeTab === 'script' ? 'bg-white border-t border-l border-r border-gray-400 z-10' : 'bg-[#D0D0D0] text-gray-600'}`}
              onClick={() => setActiveTab('script')}
            >
              SCRIPT
            </button>
            <button 
              className={`px-4 py-1 font-bold rounded-t ${activeTab === 'form' ? 'bg-white border-t border-l border-r border-gray-400 z-10' : 'bg-[#D0D0D0] text-gray-600'}`}
              onClick={() => setActiveTab('form')}
            >
              FORM
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 bg-white border border-gray-400 p-2 overflow-y-auto relative">
            {activeTab === 'info' && (
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 max-w-4xl">
                 <div className="col-span-2 bg-[#E6E6E6] p-1 font-bold border-b border-gray-300 mb-2">CUSTOMER INFORMATION</div>
                 
                 <div className="flex items-center">
                   <label className="w-24 font-bold text-right mr-2 text-gray-700">First Name:</label>
                   <input type="text" value={customerInfo.firstName} className="flex-1 border border-gray-400 px-1 bg-[#FFFFCC]" readOnly />
                 </div>
                 <div className="flex items-center">
                   <label className="w-24 font-bold text-right mr-2 text-gray-700">Last Name:</label>
                   <input type="text" value={customerInfo.lastName} className="flex-1 border border-gray-400 px-1 bg-[#FFFFCC]" readOnly />
                 </div>
                 
                 <div className="flex items-center">
                   <label className="w-24 font-bold text-right mr-2 text-gray-700">Address 1:</label>
                   <input type="text" value={customerInfo.address1} className="flex-1 border border-gray-400 px-1 bg-[#E6E6E6]" readOnly />
                 </div>
                 <div className="flex items-center">
                   <label className="w-24 font-bold text-right mr-2 text-gray-700">Address 2:</label>
                   <input type="text" className="flex-1 border border-gray-400 px-1 bg-[#E6E6E6]" readOnly />
                 </div>
                 
                 <div className="flex items-center">
                   <label className="w-24 font-bold text-right mr-2 text-gray-700">City:</label>
                   <input type="text" value={customerInfo.city} className="flex-1 border border-gray-400 px-1 bg-[#E6E6E6]" readOnly />
                 </div>
                 <div className="flex items-center">
                   <label className="w-24 font-bold text-right mr-2 text-gray-700">State:</label>
                   <input type="text" value={customerInfo.state} className="w-16 border border-gray-400 px-1 bg-[#E6E6E6]" readOnly />
                   <label className="w-12 font-bold text-right mr-2 text-gray-700">Zip:</label>
                   <input type="text" value={customerInfo.zip} className="w-20 border border-gray-400 px-1 bg-[#E6E6E6]" readOnly />
                 </div>
                 
                 <div className="col-span-2 h-px bg-gray-300 my-2"></div>
                 
                 <div className="flex items-center">
                   <label className="w-24 font-bold text-right mr-2 text-gray-700">Phone:</label>
                   <input type="text" value={customerInfo.phone} className="flex-1 border border-gray-400 px-1 bg-[#E6E6E6] font-bold" readOnly />
                   <button className="ml-1 bg-green-200 border border-green-600 px-2 text-[10px] hover:bg-green-300">DIAL</button>
                 </div>
                 <div className="flex items-center">
                   <label className="w-24 font-bold text-right mr-2 text-gray-700">Alt Phone:</label>
                   <input type="text" value={customerInfo.altPhone} className="flex-1 border border-gray-400 px-1 bg-[#E6E6E6]" readOnly />
                   <button className="ml-1 bg-green-200 border border-green-600 px-2 text-[10px] hover:bg-green-300">DIAL</button>
                 </div>
                 
                 <div className="col-span-2 mt-2">
                   <label className="block font-bold text-gray-700 mb-1">Comments:</label>
                   <textarea className="w-full border border-gray-400 p-1 h-20 bg-white" value={customerInfo.comments} readOnly></textarea>
                 </div>
              </div>
            )}
            
            {activeTab === 'script' && (
              <div className="bg-white p-4 font-mono text-sm leading-relaxed">
                <p className="mb-4 text-blue-800 font-bold">-- INTRO --</p>
                <p className="mb-4">"Hello, my name is <span className="bg-yellow-200">[Agent Name]</span> calling from ProAutoDial. How are you today?"</p>
                <p className="mb-4">"I'm calling because you recently expressed interest in our automated dialing solutions..."</p>
                <p className="mb-4 text-gray-500 italic">(Wait for response)</p>
                <p className="mb-4">"Would you have 5 minutes to discuss how we can improve your call center efficiency?"</p>
              </div>
            )}

            {activeTab === 'form' && (
              <div className="flex items-center justify-center h-full text-gray-500 italic">
                No custom form loaded for this campaign.
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar / Call Info */}
        <div className="w-48 bg-[#D0D0D0] border-l border-white p-1 flex flex-col gap-2">
           <div className="bg-black border border-gray-600 p-2 text-green-400 font-mono text-xs mb-2">
             <div className="flex justify-between"><span>Calls:</span> <span>14</span></div>
             <div className="flex justify-between"><span>Sales:</span> <span>2</span></div>
             <div className="flex justify-between"><span>Time:</span> <span>02:45:10</span></div>
             <div className="mt-2 text-center text-white border-t border-gray-600 pt-1">CAMPAIGN: TESTCAMP</div>
           </div>

           <div className="bg-[#E6E6E6] border border-gray-400 p-2 flex-1">
             <div className="font-bold text-center mb-2 border-b border-gray-400 pb-1">Call Notes</div>
             <div className="h-full overflow-y-auto text-[10px]">
               <div className="mb-2">
                 <span className="font-bold text-blue-700">10:45:12</span> - Call connected
               </div>
               <div className="mb-2">
                 <span className="font-bold text-blue-700">10:45:15</span> - Script opened
               </div>
               <div className="mb-2">
                 <span className="font-bold text-blue-700">10:46:30</span> - Customer asked about pricing
               </div>
             </div>
           </div>
           
           <button 
             className="bg-red-600 text-white font-bold py-2 border-2 border-red-800 shadow hover:bg-red-700"
             onClick={onLogout}
           >
             LOGOUT
           </button>
        </div>
      </div>
    </div>
  );
};

export default LegacyAgentDashboard;
