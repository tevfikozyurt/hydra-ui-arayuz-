
import React, { useState, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { Recommendation, SavingTask } from '../types';

const CACHE_KEY = 'hydra_recommendations_cache';
const CACHE_TIME_KEY = 'hydra_recommendations_timestamp';
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 saat

const RecommendationEngine: React.FC = () => {
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Yeni Durum Yönetimi
  const [addedTaskIds, setAddedTaskIds] = useState<string[]>([]);
  const [toast, setToast] = useState<{show: boolean, msg: string}>({show: false, msg: ''});

  const weeklyTasks: SavingTask[] = [
    { id: 'task-1', title: 'Haftalık Altın Raporu İncele', status: 'completed', note: 'Zirvedesin! 🏆' },
    { id: 'task-2', title: 'Komşunu Hydra\'ya Davet Et', status: 'in-progress', progress: 50, note: '%10 İndirim Yakın! 🤝' },
    { id: 'task-3', title: 'Sızıntı Check-up Testi Yap', status: 'new', note: 'Kritik Görev ✨' }
  ];

  useEffect(() => {
    const fetchRecs = async () => {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
      const now = Date.now();

      if (cachedData && cachedTime && (now - parseInt(cachedTime) < CACHE_DURATION)) {
        try {
          setRecs(JSON.parse(cachedData));
          setLoading(false);
          return;
        } catch (e) {
          console.error("Cache parse error", e);
        }
      }

      setLoading(true);
      try {
        const dummyData = { avgConsumption: 14.2, peakHours: '19:00-21:00', region: 'Bursa Nilüfer', householdSize: 4 };
        const aiRecs = await geminiService.getPersonalizedRecommendations(dummyData);
        
        setRecs(aiRecs);
        localStorage.setItem(CACHE_KEY, JSON.stringify(aiRecs));
        localStorage.setItem(CACHE_TIME_KEY, now.toString());
      } catch (error) {
        console.error("AI fetch failed, using fallback:", error);
        const fallback = [
          { id: 'r1', title: 'Sensörlü Musluk Başlığı', description: 'Mutfak lavabosuna takacağınız sensörlü başlık gereksiz akışı keser.', roi: '2 Ay', price: '450 TL', estimatedSaving: '110 TL', waterSavingVolume: '3.200 Litre', category: 'Cihaz' },
          { id: 'r2', title: 'Duş Süresi Optimizasyonu', description: 'Duş süresini ortalama 2 dakika kısaltarak dev tasarruf sağlayın.', roi: 'Anında', price: '0 TL', estimatedSaving: '180 TL', waterSavingVolume: '5.600 Litre', category: 'Davranış' },
          { id: 'r3', title: 'Basınç Düşürücü Regülatör', description: 'Daire girişindeki basıncı 3 bar seviyesine sabitleyerek tesisatı koruyun.', roi: '6 Ay', price: '750 TL', estimatedSaving: '95 TL', waterSavingVolume: '1.800 Litre', category: 'Tesisat' },
          { id: 'r4', title: 'Gri Su Geri Dönüşüm Sistemi', description: 'Lavabo sularını filtreleyerek rezervuarlarda tekrar kullanın.', roi: '2 Yıl', price: '4.500 TL', estimatedSaving: '420 TL', waterSavingVolume: '12.000 Litre', category: 'Cihaz' },
          { id: 'r5', title: 'Rezervuar Kapasite Azaltımı', description: 'Rezervuar içine yerleştirilen ağırlık ile her sifonda 1.5L tasarruf.', roi: '1 Ay', price: '20 TL', estimatedSaving: '45 TL', waterSavingVolume: '2.400 Litre', category: 'Davranış' },
          { id: 'r6', title: 'Gece Modu Vana Kısıtlaması', description: 'Gece 01:00 - 05:00 arası vana debisini %50 düşürerek gizli sızıntıları önleyin.', roi: 'Anında', price: '0 TL', estimatedSaving: '35 TL', waterSavingVolume: '900 Litre', category: 'Tesisat' }
        ];
        setRecs(fallback);
      } finally {
        setLoading(false);
      }
    };
    fetchRecs();
  }, []);

  // Toast Zamanlayıcısı
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast({show: false, msg: ''}), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleAddTask = (id: string) => {
    if (addedTaskIds.includes(id)) return;
    setAddedTaskIds(prev => [...prev, id]);
    setToast({show: true, msg: 'Görev Listesine Eklendi! 🚀'});
  };

  const activeTaskCount = weeklyTasks.filter(t => t.status !== 'completed').length + addedTaskIds.length;

  return (
    <div className="space-y-12 animate-fadeIn pb-24 relative">
      
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] animate-slideInUp">
          <div className="bg-white text-[#0f172a] px-8 py-4 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-blue-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <i className="fa-solid fa-check"></i>
            </div>
            <span className="font-black text-xs uppercase tracking-widest">{toast.msg}</span>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b89e14]/10 rounded-full border border-[#b89e14]/30">
            <span className="text-[10px] font-black text-[#b89e14] uppercase tracking-widest">AI Tasarruf Algoritması v2.4</span>
          </div>
          <h3 className="text-4xl font-black text-[#b89e14] tracking-tighter uppercase">Tasarruf Motoru</h3>
          <p className="text-[#b89e14]/50 font-bold uppercase tracking-[0.2em] text-[10px]">Veri Odaklı Ekolojik ve Ekonomik Çözümler</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#0f172a] p-4 rounded-2xl border border-[#b89e14]/20 text-center relative overflow-hidden">
            <p className="text-[9px] font-black text-[#b89e14]/40 uppercase mb-1">Potansiyel Kazanç</p>
            <p className="text-xl font-black text-[#b89e14]">870 TL/ay</p>
          </div>
          <div className="bg-[#b89e14] p-4 rounded-2xl shadow-xl border border-[#b89e14]/50 text-center text-[#020617] relative">
            <p className="text-[9px] font-black opacity-60 uppercase mb-1 text-[#020617]">Su Tasarrufu</p>
            <p className="text-xl font-black uppercase leading-none">25.9 m³</p>
          </div>
        </div>
      </div>

      {/* Recommendations Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? [1,2,3,4,5,6].map(i => (
          <div key={i} className="bg-[#0f172a] h-[320px] rounded-[2.5rem] border border-[#b89e14]/10 animate-pulse flex flex-col p-8 space-y-4">
            <div className="h-6 w-24 bg-[#b89e14]/5 rounded-lg"></div>
            <div className="h-8 w-full bg-[#b89e14]/5 rounded-lg"></div>
            <div className="h-20 w-full bg-[#b89e14]/5 rounded-lg"></div>
            <div className="mt-auto h-12 w-full bg-[#b89e14]/5 rounded-lg"></div>
          </div>
        )) 
        : recs.map((rec) => {
          const isAdded = addedTaskIds.includes(rec.id);
          return (
            <div key={rec.id} className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-[#b89e14]/10 shadow-2xl hover:border-[#b89e14]/50 transition-all flex flex-col group relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#b89e14]/5 rounded-full blur-3xl group-hover:bg-[#b89e14]/10 transition-all"></div>
              
              <div className="flex justify-between items-start mb-6 z-10">
                <span className={`px-4 py-1.5 text-[10px] font-black uppercase border rounded-xl tracking-widest ${
                  rec.category === 'Davranış' ? 'bg-blue-900/20 text-blue-400 border-blue-900/30' :
                  rec.category === 'Cihaz' ? 'bg-[#b89e14]/10 text-[#b89e14] border-[#b89e14]/30' :
                  'bg-emerald-900/20 text-emerald-400 border-emerald-900/30'
                }`}>
                  {rec.category}
                </span>
                <div className="text-right">
                  <p className="text-[10px] text-[#b89e14]/40 font-black uppercase tracking-tighter">Hacim Tasarrufu</p>
                  <p className="text-2xl font-black text-white">{rec.waterSavingVolume}</p>
                </div>
              </div>

              <h5 className="text-xl font-black text-[#b89e14] mb-3 uppercase tracking-tighter leading-tight">{rec.title}</h5>
              <p className="text-[#b89e14]/60 font-medium text-[13px] mb-8 flex-1 leading-relaxed italic">"{rec.description}"</p>

              <div className="flex items-center justify-between pt-6 border-t border-[#b89e14]/10 z-10">
                 <div className="grid grid-cols-2 gap-6 w-full pr-4">
                    <div>
                      <p className="text-[9px] text-[#b89e14]/40 font-black uppercase tracking-widest mb-1">Maliyet / ROI</p>
                      <p className="text-xs font-black text-white">{rec.price} <span className="text-[#b89e14]/30">|</span> {rec.roi}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-[#b89e14]/40 font-black uppercase tracking-widest mb-1">Aylık Kar</p>
                      <p className="text-xs font-black text-emerald-500">+{rec.estimatedSaving}</p>
                    </div>
                 </div>
                 <button 
                  onClick={() => handleAddTask(rec.id)}
                  disabled={isAdded}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-xl border shrink-0 ${
                    isAdded 
                    ? 'bg-emerald-500 text-[#020617] border-emerald-500 opacity-80' 
                    : 'bg-[#b89e14] text-[#020617] border-[#b89e14]/50 hover:scale-110 active:scale-90'
                  }`}
                 >
                    <i className={`fa-solid ${isAdded ? 'fa-check' : 'fa-plus'} text-lg`}></i>
                 </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* Gamification Tasks Section */}
      <section className="bg-[#0f172a] p-10 rounded-[3rem] border border-[#b89e14]/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <i className="fa-solid fa-trophy text-9xl"></i>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-[1.5rem] bg-[#b89e14] text-[#020617] flex items-center justify-center shadow-2xl shadow-[#b89e14]/20 border border-[#b89e14]/50">
               <i className="fa-solid fa-fire-flame-curved text-2xl"></i>
            </div>
            <div className="relative">
              <h4 className="font-black text-[#b89e14] uppercase tracking-widest text-lg flex items-center gap-3">
                Aktif Görevler
                <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] rounded-full animate-bounce">
                  {activeTaskCount}
                </span>
              </h4>
              <p className="text-[10px] text-[#b89e14]/50 font-bold uppercase tracking-[0.2em]">Puan Topla, Premium İndirimleri Kazan</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-[#020617] px-6 py-4 rounded-2xl border border-[#b89e14]/10">
            <span className="text-[10px] font-black text-[#b89e14]/40 uppercase tracking-widest">Seviye 4</span>
            <div className="w-32 h-2 bg-[#b89e14]/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#b89e14] w-[65%]"></div>
            </div>
            <span className="text-xs font-black text-[#b89e14]">2.450 XP</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Eklenen Dinamik Görevler */}
          {recs.filter(r => addedTaskIds.includes(r.id)).map(task => (
             <div key={task.id} className="group p-6 rounded-[2rem] border bg-[#020617] border-[#b89e14]/10 hover:border-[#b89e14]/40 transition-all animate-fadeInUp">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-8 flex-1">
                    <div className="w-14 h-14 rounded-2xl bg-[#b89e14]/10 text-[#b89e14] flex items-center justify-center shrink-0 border border-[#b89e14]/20">
                      <i className="fa-solid fa-star text-lg animate-pulse"></i>
                    </div>
                    <div>
                      <h6 className="font-black text-[#b89e14] text-xl uppercase tracking-tighter">{task.title}</h6>
                      <p className="text-[11px] text-[#b89e14]/60 font-bold uppercase tracking-widest">Yeni Eklenen Görev • +150 XP</p>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-[#b89e14] text-[#020617] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                    BAŞLAT
                  </button>
                </div>
             </div>
          ))}

          {weeklyTasks.map((task) => (
            <div key={task.id} className={`group p-6 rounded-[2rem] border transition-all duration-300 ${
              task.status === 'completed' ? 'bg-[#b89e14]/5 border-[#b89e14]/30 grayscale opacity-60' : 'bg-[#020617] border-[#b89e14]/10 hover:border-[#b89e14]/40'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-8 flex-1">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110 ${
                    task.status === 'completed' ? 'bg-[#b89e14] text-[#020617]' : 'bg-[#0f172a] text-[#b89e14]/40'
                  }`}>
                    <i className={`fa-solid ${task.status === 'completed' ? 'fa-check-double text-xl' : 'fa-circle-dot text-lg'} ${task.status === 'new' ? 'animate-pulse' : ''}`}></i>
                  </div>
                  <div className="flex-1">
                    <h6 className="font-black text-[#b89e14] text-xl uppercase tracking-tighter">{task.title}</h6>
                    <div className="flex items-center gap-4 mt-2">
                       <p className="text-[11px] text-[#b89e14]/60 font-bold uppercase tracking-widest">{task.note}</p>
                       {task.progress && (
                         <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-[#b89e14]/10 rounded-full overflow-hidden">
                              <div className="h-full bg-[#b89e14]" style={{width: `${task.progress}%`}}></div>
                            </div>
                            <span className="text-[10px] font-black text-[#b89e14]/40">%{task.progress}</span>
                         </div>
                       )}
                    </div>
                  </div>
                </div>
                <div className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-colors ${
                  task.status === 'completed' ? 'bg-[#b89e14] text-[#020617] border-[#b89e14]' : 'bg-transparent text-[#b89e14]/60 border-[#b89e14]/20 group-hover:border-[#b89e14]/50'
                }`}>
                   {task.status === 'completed' ? 'TAMAMLANDI' : task.status === 'in-progress' ? 'DEVAM EDİYOR' : 'GÖREVİ AL'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes slideInUp {
          from { transform: translate(-50%, 50px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        .animate-slideInUp { animation: slideInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default RecommendationEngine;
