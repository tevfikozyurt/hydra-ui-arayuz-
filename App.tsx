
import React, { useState, useEffect, useRef } from 'react';
import { AppView, Notification } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Assistant from './components/Assistant';
import SentimentPanel from './components/SentimentPanel';
import RecommendationEngine from './components/RecommendationEngine';
import Pricing from './components/Pricing';
import Simulator from './components/Simulator';
import NotificationPanel from './components/NotificationPanel';
import Leaderboard from './components/Leaderboard';

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Sızıntı Tespiti', message: 'Mutfak hattında normal dışı bir debi artışı saptandı. Lütfen kontrol edin.', type: 'alert', timestamp: '2 dk önce', read: false },
  { id: 'n2', title: 'AI Raporu Hazır', message: 'Haftalık su kullanım analizi ve tasarruf projeksiyonunuz oluşturuldu.', type: 'info', timestamp: '1 saat önce', read: false },
  { id: 'n3', title: 'Hedef Tamamlandı', message: 'Tebrikler! Aylık tasarruf hedefinize ulaştınız ve 2.500L su kazandınız.', type: 'success', timestamp: '5 saat önce', read: true },
];

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotifPanelOpen, setIsNotifPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifPanelOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleClearAll = () => {
    setNotifications([]);
    setIsNotifPanelOpen(false);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'assistant': return <Assistant />;
      case 'sentiment': return <SentimentPanel />;
      case 'recommendations': return <RecommendationEngine />;
      case 'pricing': return <Pricing />;
      case 'simulator': return <Simulator />;
      case 'leaderboard': return <Leaderboard />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#020617] text-[#b89e14]">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 flex items-center justify-between px-6 lg:px-8 bg-[#0f172a] border-b border-[#b89e14]/20 sticky top-0 z-30 shadow-xl">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-[#b89e14] hover:bg-[#b89e14]/10 rounded-lg transition-colors"
            >
              <i className="fa-solid fa-bars-staggered text-xl"></i>
            </button>
            
            <div className="h-8 w-px bg-[#b89e14]/20 mx-2 hidden lg:block"></div>
            
            <div className="flex items-center gap-3">
               <h2 className="text-lg font-bold text-[#b89e14] capitalize tracking-tight">
                {activeView === 'dashboard' ? 'Genel Bakış' : 
                 activeView === 'assistant' ? 'Akıllı Asistan' : 
                 activeView === 'sentiment' ? 'Müşteri Memnuniyeti' : 
                 activeView === 'recommendations' ? 'Tasarruf Motoru' : 
                 activeView === 'simulator' ? 'Tüketim Simülatörü' : 
                 activeView === 'leaderboard' ? 'Liderlik Tablosu' : 'Paketler'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#b89e14]/5 text-[#b89e14] rounded-full border border-[#b89e14]/30">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b89e14] opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b89e14]"></span>
               </span>
               <span className="text-[11px] font-black uppercase tracking-wider">Sistem Aktif</span>
            </div>

            {/* Notification Button & Panel */}
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setIsNotifPanelOpen(!isNotifPanelOpen)}
                className={`relative p-2 transition-all rounded-xl ${isNotifPanelOpen ? 'bg-[#b89e14] text-[#020617]' : 'text-[#b89e14]/60 hover:text-[#b89e14] hover:bg-[#b89e14]/5'}`}
              >
                <i className="fa-solid fa-bell text-lg"></i>
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full border-2 border-[#0f172a] animate-pulse"></span>
                )}
              </button>

              {isNotifPanelOpen && (
                <NotificationPanel 
                  notifications={notifications}
                  onMarkAsRead={handleMarkAsRead}
                  onClearAll={handleClearAll}
                  onClose={() => setIsNotifPanelOpen(false)}
                />
              )}
            </div>
            
            <div className="flex items-center gap-3 pl-2 border-l border-[#b89e14]/20">
              <div className="text-right hidden md:block">
                <p className="text-xs font-bold text-[#b89e14]">Hasan Kaya</p>
                <p className="text-[10px] text-[#b89e14]/50 font-medium">Bireysel Kullanıcı</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#b89e14] flex items-center justify-center text-[#020617] font-bold shadow-lg shadow-[#b89e14]/10 text-sm border border-[#b89e14]/30">
                HK
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8 max-w-[1600px] mx-auto w-full">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
