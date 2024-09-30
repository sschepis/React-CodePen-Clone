import React from 'react';
import { FaCode, FaChartBar, FaCog, FaUserFriends, FaHistory } from 'react-icons/fa';

const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div className={`h-full bg-gray-800 text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        className="w-full py-2 text-center hover:bg-gray-700 transition-colors duration-200"
      >
        {isSidebarOpen ? '<<' : '>>'}
      </button>
      <div className="flex flex-col p-4">
        <SidebarButton
          icon={<FaCode />}
          text="Code"
          isActive={activeTab === 'code'}
          onClick={() => setActiveTab('code')}
          isSidebarOpen={isSidebarOpen}
        />
        <SidebarButton
          icon={<FaChartBar />}
          text="Output"
          isActive={activeTab === 'output'}
          onClick={() => setActiveTab('output')}
          isSidebarOpen={isSidebarOpen}
        />
        <SidebarButton
          icon={<FaCog />}
          text="Analysis"
          isActive={activeTab === 'analysis'}
          onClick={() => setActiveTab('analysis')}
          isSidebarOpen={isSidebarOpen}
        />
        <SidebarButton
          icon={<FaUserFriends />}
          text="Collaborate"
          isActive={activeTab === 'collaboration'}
          onClick={() => setActiveTab('collaboration')}
          isSidebarOpen={isSidebarOpen}
        />
        <SidebarButton
          icon={<FaHistory />}
          text="History"
          isActive={activeTab === 'history'}
          onClick={() => setActiveTab('history')}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
    </div>
  );
};

const SidebarButton = ({ icon, text, isActive, onClick, isSidebarOpen }) => (
  <button
    onClick={onClick}
    className={`flex items-center py-2 px-4 w-full rounded-md transition-colors duration-200 ${
      isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
    }`}
  >
    <span className="text-xl">{icon}</span>
    {isSidebarOpen && <span className="ml-3">{text}</span>}
  </button>
);

export default Sidebar;