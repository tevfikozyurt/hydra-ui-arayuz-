
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen }) => {
  const menuItems: { id: AppView; icon: string; label: string }[] = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: 'Dashboard' },
    { id: 'leaderboard', icon: 'fa-trophy', label: 'Liderlik Tablosu' },
    { id: 'assistant', icon: 'fa-robot', label: 'Akıllı Asistan' },
    { id: 'simulator', icon: 'fa-calculator', label: 'Tüketim Simülatörü' },
    { id: 'sentiment', icon: 'fa-face-smile', label: 'Duygu Analizi' },
    { id: 'recommendations', icon: 'fa-lightbulb', label: 'Tasarruf Motoru' },
    { id: 'pricing', icon: 'fa-tag', label: 'Fiyatlandırma' },
  ];

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-0 lg:w-20'} transition-all duration-300 bg-[#020617] text-[#b89e14] flex flex-col relative z-20 shadow-2xl border-r border-[#b89e14]/10`}>
      <div className="h-16 flex items-center px-6 overflow-hidden border-b border-[#b89e14]/10 bg-[#0f172a]/50 backdrop-blur-md">
        <span className={`font-black text-2xl tracking-[0.2em] text-[#b89e14] transition-all ${!isOpen && 'lg:hidden opacity-0'}`}>
          HYDRA
        </span>
      </div>

      <nav className="flex-1 py-6 space-y-2 px-3 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${
              activeView === item.id 
                ? 'bg-[#b89e14] text-[#020617] shadow-lg shadow-[#b89e14]/10 scale-[1.02] border border-[#b89e14]/50' 
                : 'text-[#b89e14]/50 hover:bg-[#0f172a] hover:text-[#b89e14]'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg w-6 shrink-0`}></i>
            <span className={`ml-4 font-bold truncate ${!isOpen && 'lg:hidden'}`}>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-[#b89e14]/10">
        <div className={`bg-[#0f172a] rounded-2xl p-3 flex items-center border border-[#b89e14]/10 ${!isOpen && 'lg:p-2'}`}>
          <div className="w-8 h-8 rounded-lg bg-[#b89e14]/10 text-[#b89e14] flex items-center justify-center shrink-0 border border-[#b89e14]/20">
            <i className="fa-solid fa-crown text-xs"></i>
          </div>
          <div className={`ml-3 overflow-hidden ${!isOpen && 'lg:hidden'}`}>
            <p className="text-[10px] font-bold text-[#b89e14]/60 uppercase tracking-widest">Abonelik</p>
            <p className="text-xs text-[#b89e14] font-black uppercase">PREMİUM ÜYE</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
