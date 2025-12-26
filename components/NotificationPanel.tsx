
import React from 'react';
import { Notification } from '../types';

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ 
  notifications, 
  onMarkAsRead, 
  onClearAll, 
  onClose 
}) => {
  return (
    <div className="absolute top-16 right-0 w-80 md:w-96 bg-[#0f172a] border border-[#b89e14]/30 rounded-3xl shadow-2xl z-50 overflow-hidden animate-fadeInUp">
      <div className="p-5 border-b border-[#b89e14]/10 bg-[#020617] flex items-center justify-between">
        <h4 className="font-black text-[#b89e14] text-xs uppercase tracking-widest">Bildirimler</h4>
        <div className="flex gap-4">
          <button 
            onClick={onClearAll}
            className="text-[9px] font-black text-[#b89e14]/40 hover:text-[#b89e14] uppercase tracking-tighter transition-colors"
          >
            Tümünü Temizle
          </button>
          <button onClick={onClose} className="text-[#b89e14]/40 hover:text-[#b89e14]">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto custom-scrollbar bg-[#0f172a]/50">
        {notifications.length === 0 ? (
          <div className="p-10 text-center space-y-3">
            <i className="fa-solid fa-bell-slash text-[#b89e14]/10 text-4xl"></i>
            <p className="text-[10px] font-bold text-[#b89e14]/30 uppercase tracking-widest">Henüz bildirim yok</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div 
              key={n.id} 
              onClick={() => onMarkAsRead(n.id)}
              className={`p-5 border-b border-[#b89e14]/5 hover:bg-[#b89e14]/5 transition-all cursor-pointer group relative ${!n.read ? 'bg-[#b89e14]/5' : ''}`}
            >
              {!n.read && (
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#b89e14] rounded-full shadow-[0_0_10px_rgba(184,158,20,0.5)]"></div>
              )}
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                  n.type === 'alert' ? 'bg-red-900/10 text-red-500 border-red-900/20' :
                  n.type === 'success' ? 'bg-emerald-900/10 text-emerald-500 border-emerald-900/20' :
                  'bg-blue-900/10 text-blue-500 border-blue-900/20'
                }`}>
                  <i className={`fa-solid ${
                    n.type === 'alert' ? 'fa-triangle-exclamation' :
                    n.type === 'success' ? 'fa-circle-check' : 'fa-info-circle'
                  }`}></i>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className={`text-xs font-black uppercase tracking-tight ${!n.read ? 'text-[#b89e14]' : 'text-[#b89e14]/60'}`}>
                      {n.title}
                    </h5>
                    <span className="text-[8px] font-bold text-[#b89e14]/30 whitespace-nowrap">{n.timestamp}</span>
                  </div>
                  <p className="text-[11px] font-medium text-[#b89e14]/50 leading-relaxed italic line-clamp-2">
                    "{n.message}"
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 bg-[#020617] border-t border-[#b89e14]/10 text-center">
        <button className="text-[10px] font-black text-[#b89e14] uppercase tracking-widest hover:underline">
          Tüm Bildirim Geçmişini Gör
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;
