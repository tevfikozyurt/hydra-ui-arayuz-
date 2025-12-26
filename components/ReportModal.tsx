
import React from 'react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md animate-fadeIn"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-[#0f172a] border border-[#b89e14]/30 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-zoomIn">
        {/* Header */}
        <div className="p-8 bg-gradient-to-r from-[#b89e14]/10 to-transparent border-b border-[#b89e14]/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-[#b89e14] flex items-center justify-center text-[#020617]">
                <i className="fa-solid fa-file-invoice"></i>
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter">Aylık Performans Raporu</h3>
            </div>
            <p className="text-[10px] text-[#b89e14]/50 font-bold uppercase tracking-[0.3em]">Dönem: 1 - 30 Mart 2024</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-[#b89e14]/10 flex items-center justify-center text-[#b89e14]/40 hover:text-[#b89e14] transition-all"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* Executive Summary Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-[#020617] rounded-2xl border border-[#b89e14]/10">
              <p className="text-[10px] font-black text-[#b89e14]/40 uppercase mb-2">Genel Performans</p>
              <p className="text-sm font-medium text-white leading-relaxed">
                Bu ay toplam <span className="text-[#b89e14] font-black">14.2 m³</span> su tükettiniz. Geçen aya göre <span className="text-emerald-500 font-black">%12 tasarruf</span> sağladınız.
              </p>
            </div>
            <div className="p-5 bg-[#020617] rounded-2xl border border-[#b89e14]/10">
              <p className="text-[10px] font-black text-[#b89e14]/40 uppercase mb-2">Mali Etki</p>
              <p className="text-sm font-medium text-white leading-relaxed">
                Sağlanan tasarruf sayesinde faturanızdan <span className="text-emerald-500 font-black">45.50 TL</span> net kar elde edildi.
              </p>
            </div>
          </div>

          {/* AI Insights Section */}
          <div className="p-6 bg-[#b89e14]/5 rounded-3xl border border-[#b89e14]/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <i className="fa-solid fa-brain text-6xl"></i>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <i className="fa-solid fa-microchip text-[#b89e14] text-xs"></i>
              <h4 className="text-xs font-black text-[#b89e14] uppercase tracking-widest">Hydra AI Analiz Notu</h4>
            </div>
            <p className="text-[13px] font-medium text-[#b89e14]/80 leading-relaxed italic">
              "Tüketim alışkanlıklarınız incelendiğinde, su kullanımının <span className="font-black text-[#b89e14]">%40'ının</span> sabah 07:00-09:00 saatleri arasında yoğunlaştığı görülmektedir. Bu saatlerdeki akış hızını <span className="font-black text-[#b89e14]">%5</span> düşürerek aylık ekstra 10 TL daha kazanabilirsiniz."
            </p>
          </div>

          {/* Health & Eco Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-4 bg-[#020617] rounded-2xl border border-[#b89e14]/10">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                <i className="fa-solid fa-shield-check"></i>
              </div>
              <div>
                <p className="text-[9px] font-black text-[#b89e14]/40 uppercase tracking-widest">Sızıntı Durumu</p>
                <p className="text-xs font-bold text-white">Sistem %100 Sağlıklı</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-emerald-950/20 rounded-2xl border border-emerald-500/10">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-[#020617] flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <i className="fa-solid fa-tree"></i>
              </div>
              <div>
                <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Ekolojik Katkı</p>
                <p className="text-xs font-bold text-white">2 Yetişkin Ağaç/Yıl</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-[#020617]/50 border-t border-[#b89e14]/10 flex flex-col sm:flex-row gap-4">
          <button 
            className="flex-1 py-4 bg-[#b89e14] text-[#020617] rounded-2xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-file-pdf"></i>
            PDF Olarak İndir
          </button>
          <button 
            onClick={onClose}
            className="px-8 py-4 bg-[#0f172a] text-[#b89e14] border border-[#b89e14]/20 rounded-2xl font-black uppercase tracking-widest hover:bg-[#b89e14]/10 transition-all"
          >
            Kapat
          </button>
        </div>
      </div>

      <style>{`
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-zoomIn { animation: zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
};

export default ReportModal;
