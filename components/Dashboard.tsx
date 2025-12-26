
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ReportModal from './ReportModal';
import ServiceModal from './ServiceModal';

const data = [
  { name: 'Ocak', usage: 12 },
  { name: 'Şubat', usage: 19 },
  { name: 'Mart', usage: 15 },
  { name: 'Nisan', usage: 22 },
  { name: 'Mayıs', usage: 18 },
  { name: 'Haziran', usage: 14 },
];

const Dashboard: React.FC = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  
  // Vana Durum Yönetimi
  const [valveState, setValveState] = useState<'open' | 'locking' | 'locked'>('open');
  const [showToast, setShowToast] = useState(false);

  const handleValveToggle = () => {
    if (valveState === 'locked') {
      setValveState('open');
      return;
    }

    setValveState('locking');
    
    // 1 saniyelik simüle edilmiş işlem süresi
    setTimeout(() => {
      setValveState('locked');
      setShowToast(true);
    }, 1200);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="space-y-8 animate-fadeIn relative">
      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-20 right-8 z-[150] animate-slideInRight">
          <div className="bg-[#0f172a] border border-emerald-500/50 p-4 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.2)] flex items-center gap-4 backdrop-blur-xl">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-[#020617] flex items-center justify-center shadow-lg">
              <i className="fa-solid fa-check text-lg"></i>
            </div>
            <div>
              <p className="text-xs font-black text-white uppercase tracking-tighter">İşlem Başarılı</p>
              <p className="text-[11px] font-medium text-emerald-500/80 italic">Vana Başarıyla Kapatıldı! Su akışı durduruldu.</p>
            </div>
            <button onClick={() => setShowToast(false)} className="ml-4 text-[#b89e14]/40 hover:text-[#b89e14]">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon="fa-droplet" label="Aylık Tüketim" value="14.2 m³" delta="-12%" trend="down" />
        <StatCard icon="fa-wallet" label="Tahmini Fatura" value="285.50 TL" delta="+2%" trend="up" />
        <StatCard icon="fa-leaf" label="Tasarruf Skoru" value="88/100" delta="+5" trend="up" />
        <StatCard icon="fa-triangle-exclamation" label="Aktif Uyarılar" value="1 Sızıntı" delta="Acil" trend="neutral" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0f172a] p-6 rounded-3xl border border-[#b89e14]/10 shadow-2xl">
          <h3 className="text-lg font-bold text-[#b89e14] mb-6 flex items-center gap-2">
            <i className="fa-solid fa-chart-line"></i> Tüketim Analizi
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b89e14" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#b89e14" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#b89e1422" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#b89e1488', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#b89e1488', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#020617', borderRadius: '12px', border: '1px solid #b89e14', color: '#b89e14'}}
                  itemStyle={{color: '#b89e14'}}
                />
                <Area type="monotone" dataKey="usage" stroke="#b89e14" strokeWidth={3} fillOpacity={1} fill="url(#goldGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0f172a] p-6 rounded-3xl border border-[#b89e14]/10 shadow-2xl">
            <h3 className="text-lg font-bold text-[#b89e14] mb-4">Hızlı Aksiyonlar</h3>
            <div className="space-y-3">
              <button 
                onClick={handleValveToggle}
                disabled={valveState === 'locking'}
                className={`w-full flex items-center p-4 rounded-2xl border font-bold transition-all relative overflow-hidden group ${
                  valveState === 'locked' 
                    ? 'bg-red-950/30 text-red-500 border-red-500/40' 
                    : valveState === 'locking'
                    ? 'bg-[#b89e14]/10 text-[#b89e14]/50 border-[#b89e14]/20 cursor-wait'
                    : 'bg-[#b89e14] text-[#020617] border-[#b89e14]'
                }`}
              >
                {valveState === 'locking' ? (
                  <i className="fa-solid fa-circle-notch fa-spin mr-3 text-lg"></i>
                ) : (
                  <i className={`fa-solid ${valveState === 'locked' ? 'fa-lock' : 'fa-faucet'} mr-3 text-lg`}></i>
                )}
                <span className="text-sm uppercase tracking-wider">
                  {valveState === 'locking' ? 'İşleniyor...' : valveState === 'locked' ? 'Vana Kapalı' : 'Vanayı Kilitle'}
                </span>
                
                {valveState === 'locked' && (
                  <span className="ml-auto text-[8px] font-black bg-red-500/20 px-2 py-1 rounded uppercase animate-pulse">Aktif</span>
                )}
              </button>

              <ActionButton 
                icon="fa-wrench" 
                label="Servis Talebi" 
                onClick={() => setIsServiceModalOpen(true)}
              />
              <ActionButton 
                icon="fa-file-invoice" 
                label="Aylık Rapor" 
                onClick={() => setIsReportModalOpen(true)}
              />
            </div>
          </div>

          <div className="bg-[#b89e14] p-6 rounded-3xl text-[#020617] shadow-2xl border border-[#b89e14]/50 group">
            <h3 className="text-lg font-black mb-2 flex items-center gap-2 uppercase tracking-tighter">
               <i className="fa-solid fa-bolt"></i> Altın İpucu
            </h3>
            <p className="text-[#020617]/80 text-sm font-semibold mb-4 leading-relaxed italic">Su basıncını optimize ederek faturanızı %15 düşürebilirsiniz.</p>
            <button className="w-full text-xs font-black bg-[#020617] text-[#b89e14] px-5 py-3 rounded-xl hover:opacity-90 transition-all border border-[#b89e14]/20 uppercase tracking-widest">
              Aktifleştir
            </button>
          </div>
        </div>
      </div>

      <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
      <ServiceModal isOpen={isServiceModalOpen} onClose={() => setIsServiceModalOpen(false)} />

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideInRight { animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
};

const StatCard = ({ icon, label, value, delta, trend }: any) => {
  return (
    <div className="bg-[#0f172a] p-6 rounded-3xl border border-[#b89e14]/10 shadow-xl hover:border-[#b89e14]/40 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-2xl bg-[#b89e14]/10 text-[#b89e14] border border-[#b89e14]/20">
          <i className={`fa-solid ${icon} text-xl`}></i>
        </div>
        <span className={`text-[10px] font-black px-2 py-1 rounded-md border uppercase tracking-widest ${
          trend === 'up' ? 'bg-red-900/20 text-red-500 border-red-900/30' : 
          trend === 'down' ? 'bg-[#b89e14]/10 text-[#b89e14] border-[#b89e14]/30' : 'bg-slate-800 text-[#b89e14]/60 border-slate-700'
        }`}>
          {delta}
        </span>
      </div>
      <p className="text-[10px] text-[#b89e14]/50 font-black uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-black text-[#b89e14] mt-1">{value}</p>
    </div>
  );
};

interface ActionButtonProps {
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, active, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center p-4 rounded-2xl border font-bold transition-all ${
        active ? 'bg-[#b89e14] text-[#020617] border-[#b89e14]' : 'bg-[#020617] text-[#b89e14] border-[#b89e14]/20 hover:bg-[#b89e14]/5'
      }`}
    >
      <i className={`fa-solid ${icon} mr-3 text-lg`}></i>
      <span className="text-sm uppercase tracking-wider">{label}</span>
    </button>
  );
};

export default Dashboard;
