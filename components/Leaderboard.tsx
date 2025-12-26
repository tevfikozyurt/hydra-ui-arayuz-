
import React from 'react';

const TOP_HOUSEHOLDS = [
  { id: 1, name: "Demir Ailesi", saving: 42, points: 2850, region: "Nilüfer", trend: "up" },
  { id: 2, name: "Yılmaz Ailesi", saving: 38, points: 2420, region: "Altıeylül", trend: "up" },
  { id: 3, name: "Kaya Ailesi", saving: 35, points: 2100, region: "Karesi", trend: "down" },
  { id: 4, name: "Öztürk Ailesi", saving: 31, points: 1850, region: "Bandırma", trend: "up" },
  { id: 5, name: "Şahin Ailesi", saving: 28, points: 1600, region: "Edremit", trend: "neutral" },
];

const Leaderboard: React.FC = () => {
  return (
    <div className="space-y-16 animate-fadeIn pb-24 relative overflow-hidden">
      {/* Dynamic Water Ripples Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="ripple absolute top-1/4 left-1/2 w-[600px] h-[600px] border border-[#00f2ff] rounded-full animate-ripple"></div>
        <div className="ripple absolute top-1/4 left-1/2 w-[800px] h-[800px] border border-[#00f2ff] rounded-full animate-ripple [animation-delay:2s]"></div>
      </div>

      {/* Hero Header */}
      <div className="text-center space-y-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <i className="fa-solid fa-leaf text-emerald-500 text-xs"></i>
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Sürdürülebilirlik Ligi</span>
        </div>
        <h2 className="text-6xl font-black text-white tracking-tighter uppercase italic">
          Geleceğin <span className="text-[#b89e14]">Kahramanları</span>
        </h2>
        <p className="text-[#b89e14]/60 font-bold uppercase tracking-widest text-xs">En yüksek tasarruf sağlayan haneler "Sıfır Fatura" ile ödüllendirilir.</p>
      </div>

      {/* 3D Isometric Victory Scene */}
      <div className="relative h-[500px] flex items-end justify-center perspective-1000 mt-10">
        
        {/* Decorative Trees & Environment */}
        <div className="absolute bottom-10 left-[15%] opacity-40 animate-bounce-slow">
           <svg width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M40 10L10 60H70L40 10Z" fill="#10B981" />
             <path d="M40 30L15 75H65L40 30Z" fill="#059669" />
             <rect x="35" y="75" width="10" height="20" fill="#4B5563" />
           </svg>
        </div>
        <div className="absolute bottom-20 right-[15%] opacity-40 animate-bounce-slow [animation-delay:1s]">
           <svg width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M30 5L5 45H55L30 5Z" fill="#10B981" />
             <path d="M30 20L10 55H50L30 20Z" fill="#059669" />
             <rect x="27" y="55" width="6" height="15" fill="#4B5563" />
           </svg>
        </div>

        {/* Isometric Podium Layout */}
        <div className="flex items-end gap-2 md:gap-4 relative z-10">
          
          {/* 2nd Place HOUSE */}
          <div className="flex flex-col items-center group">
            <div className="mb-4 text-center transform transition-all group-hover:-translate-y-4">
              <div className="relative bg-white/10 backdrop-blur-md p-1 rounded-xl mb-2 border border-white/20 shadow-2xl">
                 <p className="text-[8px] font-black text-[#00f2ff] uppercase px-2 py-1">Fatura: 0.00 TL</p>
              </div>
              <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-400 rounded-2xl shadow-xl flex items-center justify-center relative overflow-hidden">
                 <i className="fa-solid fa-house-chimney text-4xl text-slate-800"></i>
                 <div className="absolute bottom-0 w-full h-1/3 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-[8px] font-black text-slate-900 uppercase tracking-tighter italic">GÜMÜŞ LİG</span>
                 </div>
              </div>
            </div>
            <div className="w-32 h-36 bg-gradient-to-b from-slate-400 to-[#020617] rounded-t-3xl border-x border-t border-slate-400/30 flex items-center justify-center shadow-2xl">
               <span className="text-5xl font-black text-slate-900/20">2</span>
            </div>
          </div>

          {/* 1st Place HOUSE (Center & Largest) */}
          <div className="flex flex-col items-center group scale-110 -translate-y-4">
            <div className="mb-6 text-center transform transition-all group-hover:-translate-y-6">
              <div className="relative bg-emerald-500 text-white p-2 rounded-xl mb-3 border border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)] animate-pulse">
                 <p className="text-[10px] font-black uppercase flex items-center gap-2">
                    <i className="fa-solid fa-check-circle"></i> Fatura Ödendi: 0.00 TL
                 </p>
              </div>
              <div className="w-32 h-32 bg-white rounded-3xl shadow-[0_20px_50px_rgba(184,158,20,0.3)] flex items-center justify-center relative overflow-hidden border-4 border-[#b89e14]">
                 <i className="fa-solid fa-house-flag text-5xl text-[#b89e14]"></i>
                 <div className="absolute top-2 right-2 flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                 </div>
                 <div className="absolute bottom-0 w-full h-1/3 bg-[#b89e14] flex items-center justify-center">
                    <span className="text-[10px] font-black text-[#020617] uppercase tracking-widest italic">ALTIN ŞAMPİYON</span>
                 </div>
              </div>
            </div>
            <div className="w-44 h-52 bg-gradient-to-b from-[#b89e14] to-[#020617] rounded-t-[2.5rem] border-x border-t border-[#b89e14]/50 flex items-center justify-center shadow-[0_-20px_50px_rgba(184,158,20,0.3)] relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
               <span className="text-8xl font-black text-[#020617]/20">1</span>
            </div>
          </div>

          {/* 3rd Place HOUSE */}
          <div className="flex flex-col items-center group">
            <div className="mb-4 text-center transform transition-all group-hover:-translate-y-4">
               <div className="relative bg-white/10 backdrop-blur-md p-1 rounded-xl mb-2 border border-white/20 shadow-2xl">
                 <p className="text-[8px] font-black text-[#cd7f32] uppercase px-2 py-1">Fatura: 0.00 TL</p>
              </div>
              <div className="w-24 h-24 bg-gradient-to-br from-orange-300 to-orange-500 rounded-2xl shadow-xl flex items-center justify-center relative overflow-hidden">
                 <i className="fa-solid fa-house text-4xl text-orange-900"></i>
                 <div className="absolute bottom-0 w-full h-1/3 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-[8px] font-black text-orange-900 uppercase tracking-tighter italic">BRONZ LİG</span>
                 </div>
              </div>
            </div>
            <div className="w-32 h-28 bg-gradient-to-b from-orange-500 to-[#020617] rounded-t-3xl border-x border-t border-orange-500/30 flex items-center justify-center shadow-2xl">
               <span className="text-5xl font-black text-orange-900/20">3</span>
            </div>
          </div>

        </div>
      </div>

      {/* Leaderboard Table List */}
      <div className="max-w-4xl mx-auto space-y-4 relative z-10">
        <div className="grid grid-cols-12 px-8 py-2 text-[10px] font-black text-[#b89e14]/40 uppercase tracking-[0.2em]">
          <div className="col-span-1">Sıra</div>
          <div className="col-span-5">Hane Bilgisi</div>
          <div className="col-span-2 text-center">Bölge</div>
          <div className="col-span-2 text-center">Tasarruf %</div>
          <div className="col-span-2 text-right">Hydra Puan</div>
        </div>
        
        {TOP_HOUSEHOLDS.map((h, i) => (
          <div key={h.id} className="grid grid-cols-12 items-center px-8 py-6 bg-[#0f172a]/80 border border-[#b89e14]/10 rounded-2xl hover:border-[#b89e14]/40 transition-all group backdrop-blur-xl">
            <div className="col-span-1 font-black text-[#b89e14] text-lg">#{i + 1}</div>
            <div className="col-span-5 flex items-center gap-4">
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center border font-black ${
                 i === 0 ? 'bg-[#b89e14] text-[#020617] border-[#b89e14]' : 'bg-[#b89e14]/10 text-[#b89e14] border-[#b89e14]/20'
               }`}>
                 {h.name[0]}
               </div>
               <div>
                 <p className="font-bold text-white group-hover:text-[#b89e14] transition-colors">{h.name}</p>
                 <div className="flex items-center gap-2">
                   <i className={`fa-solid fa-caret-${h.trend === 'up' ? 'up text-emerald-500' : h.trend === 'down' ? 'down text-red-500' : 'right text-[#b89e14]/40'} text-[10px]`}></i>
                   <span className="text-[9px] font-bold text-[#b89e14]/40 uppercase tracking-widest italic">Aylık Trend</span>
                 </div>
               </div>
            </div>
            <div className="col-span-2 text-center text-xs font-medium text-[#b89e14]/60">{h.region}</div>
            <div className="col-span-2 text-center font-black text-emerald-500">%{h.saving}</div>
            <div className="col-span-2 text-right">
              <span className="px-3 py-1 bg-[#b89e14] text-[#020617] rounded-lg text-[10px] font-black shadow-lg">
                {h.points} XP
              </span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        .animate-ripple { animation: ripple 4s linear infinite; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow { animation: bounce-slow 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Leaderboard;
