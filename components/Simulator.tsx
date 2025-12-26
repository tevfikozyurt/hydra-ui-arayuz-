
import React, { useState, useEffect } from 'react';
import { geminiService } from '../services/geminiService';

const CITY_PRICES: Record<string, number> = {
  "Bursa": 22.45,
  "İstanbul": 32.18,
  "Ankara": 28.50,
  "İzmir": 35.60,
  "Antalya": 24.10
};

const TURKEY_AVG_DAILY_LITERS = 190;

const Simulator: React.FC = () => {
  const [city, setCity] = useState("Bursa");
  const [billAmount, setBillAmount] = useState<string>("300");
  const [dailyLiters, setDailyLiters] = useState(0);
  const [aboveAvg, setAboveAvg] = useState(0);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    const amount = parseFloat(billAmount) || 0;
    const price = CITY_PRICES[city];
    // Formül: (Fatura / m3 fiyatı) / 30 gün * 1000 (Litreye çevrim)
    const m3 = amount / price;
    const daily = (m3 / 30) * 1000;
    setDailyLiters(Math.round(daily));

    const diffPercent = ((daily - TURKEY_AVG_DAILY_LITERS) / TURKEY_AVG_DAILY_LITERS) * 100;
    setAboveAvg(Math.round(diffPercent));
  }, [city, billAmount]);

  const runAiAnalysis = async () => {
    setLoadingAi(true);
    try {
      const result = await geminiService.analyzeSimulation({
        city,
        dailyLiters,
        aboveAvg
      });
      setAiAnalysis(result || "");
    } catch (e) {
      setAiAnalysis("Analiz sırasında bir hata oluştu.");
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fadeIn pb-20">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Giriş Paneli */}
        <div className="flex-1 bg-[#0f172a] p-8 rounded-[2.5rem] border border-[#b89e14]/20 shadow-2xl space-y-8">
          <div>
            <h3 className="text-2xl font-black text-[#b89e14] tracking-tight uppercase">Simülatör Girdileri</h3>
            <p className="text-[10px] text-[#b89e14]/40 font-bold uppercase tracking-widest mt-1 italic">Veri odaklı maliyet projeksiyonu</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#b89e14]/60 uppercase tracking-widest ml-1">Şehir Seçimi ($m^3$ Fiyatı)</label>
              <select 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#020617] border border-[#b89e14]/20 rounded-2xl px-5 py-4 text-[#b89e14] outline-none focus:border-[#b89e14] transition-all appearance-none cursor-pointer"
              >
                {Object.keys(CITY_PRICES).map(c => (
                  <option key={c} value={c}>{c} - {CITY_PRICES[c]} TL / m³</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#b89e14]/60 uppercase tracking-widest ml-1">Son Fatura Tutarı (TL)</label>
              <div className="relative">
                <input 
                  type="number"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  className="w-full bg-[#020617] border border-[#b89e14]/20 rounded-2xl px-5 py-4 text-[#b89e14] outline-none focus:border-[#b89e14] transition-all text-xl font-bold"
                  placeholder="0.00"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[#b89e14]/30 font-black">TL</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#b89e14]/10">
            <div className="p-5 bg-[#b89e14]/5 rounded-2xl border border-[#b89e14]/10">
              <p className="text-[10px] text-[#b89e14]/60 leading-relaxed font-medium italic">
                * Bu hesaplama, ilgili belediyenin güncel m³ tarifesi üzerinden KDV ve atık su bedelleri dahil edilmeden yapılan bir projeksiyondur.
              </p>
            </div>
          </div>
        </div>

        {/* Sonuç Paneli */}
        <div className="flex-1 space-y-6">
          <div className="bg-[#b89e14] p-10 rounded-[2.5rem] shadow-2xl border border-[#b89e14]/50 relative overflow-hidden group">
             <div className="absolute -right-4 -top-4 opacity-10 rotate-12 transition-transform group-hover:scale-110">
                <i className="fa-solid fa-droplet text-9xl"></i>
             </div>
             
             <p className="text-[11px] font-black text-[#020617]/40 uppercase tracking-[0.2em] mb-2">Günlük Tahmini Tüketim</p>
             <div className="flex items-baseline gap-3">
               <h4 className="text-6xl font-black text-[#020617] tracking-tighter">{dailyLiters}</h4>
               <span className="text-xl font-black text-[#020617]/60 uppercase">Litre</span>
             </div>

             <div className="mt-10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-[#020617]/40 uppercase tracking-widest mb-1">Ülke Ortalaması Kıyas</p>
                  <p className={`text-sm font-black uppercase ${aboveAvg > 0 ? 'text-red-900' : 'text-emerald-900'}`}>
                    {aboveAvg > 0 ? `Ortalamanın %${aboveAvg} üzerindesiniz!` : `Ortalamanın %${Math.abs(aboveAvg)} altındasınız!`}
                  </p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-[#020617] text-[#b89e14] flex items-center justify-center shadow-xl">
                   <i className={`fa-solid ${aboveAvg > 20 ? 'fa-triangle-exclamation animate-pulse' : 'fa-check-circle'} text-2xl`}></i>
                </div>
             </div>
          </div>

          <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-[#b89e14]/10 shadow-xl relative min-h-[220px]">
             {aiAnalysis ? (
               <div className="animate-fadeIn">
                 <div className="flex items-center gap-3 mb-4">
                    <i className="fa-solid fa-microchip text-[#b89e14] text-xs"></i>
                    <h5 className="text-xs font-black text-[#b89e14] uppercase tracking-widest">AI Derin Analiz</h5>
                 </div>
                 <p className="text-sm font-medium text-[#b89e14]/70 leading-relaxed italic border-l-2 border-[#b89e14]/30 pl-4">
                    {aiAnalysis}
                 </p>
                 <button 
                  onClick={() => setAiAnalysis("")}
                  className="mt-6 text-[9px] font-black text-[#b89e14]/40 uppercase tracking-widest hover:text-[#b89e14] transition-colors"
                 >
                   Yeniden Tara
                 </button>
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-4">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#b89e14]/20 flex items-center justify-center">
                     <i className="fa-solid fa-brain text-[#b89e14]/20 text-xl"></i>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-[#b89e14]/50 uppercase tracking-widest">Sızıntı ve Verimlilik Taraması</p>
                    <button 
                      onClick={runAiAnalysis}
                      disabled={loadingAi}
                      className="px-8 py-3 bg-[#b89e14] text-[#020617] rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-105 transition-all disabled:opacity-50"
                    >
                      {loadingAi ? 'Analiz Ediliyor...' : 'AI Analizini Başlat'}
                    </button>
                  </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
