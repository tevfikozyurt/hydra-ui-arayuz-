
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';

const initialFeedbacks = [
  { id: '1', user: 'Ahmet Y.', comment: 'Mutfakta sızıntı var, su her yere yayılıyor! 😱 Acil yardım lütfen. 🆘', timestamp: '2 dk önce' },
  { id: '2', user: 'Zeynep K.', comment: 'Sistemi kurduğumuzdan beri faturalarım ciddi oranda düştü, çok mutluyum. 😊💧 Tasarruf harika!', timestamp: '1 saat önce' },
  { id: '3', user: 'Mehmet S.', comment: 'Aylık tasarruf raporum hala gelmedi, gecikme nedenini öğrenebilir miyim? 🤔⏳', timestamp: '3 saat önce' },
  { id: '4', user: 'Canan B.', comment: 'Akıllı vana sızıntıyı anında fark edip suyu kesti, evi su basmasından kurtardı! 🛡️🙏 Müthiş bir teknoloji.', timestamp: '5 saat önce' },
];

const SentimentPanel: React.FC = () => {
  const [analyzedData, setAnalyzedData] = useState<Record<string, any>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const runAnalysis = async (id: string, text: string) => {
    setLoadingId(id);
    try {
      const result = await geminiService.analyzeSentiment(text);
      setAnalyzedData(prev => ({ ...prev, [id]: result }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-10 text-[#b89e14]">
      <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-[#b89e14]/20 shadow-2xl">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-10 gap-8">
          <div>
            <h3 className="text-2xl font-black text-[#b89e14] tracking-tight uppercase">Feedback Denetimi</h3>
            <p className="text-[10px] text-[#b89e14]/50 font-bold uppercase tracking-widest mt-1">AI Destekli Analiz</p>
          </div>
          <div className="flex flex-wrap gap-4">
             <SentimentStat label="MEMNUN" val="75%" />
             <SentimentStat label="ENDİŞELİ" val="15%" />
             <SentimentStat label="KRİTİK" val="10%" />
          </div>
        </div>

        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
          {initialFeedbacks.map((f) => {
            const analysis = analyzedData[f.id];
            return (
              <div key={f.id} className="p-6 border border-[#b89e14]/10 rounded-3xl bg-[#020617]/50 hover:bg-[#020617] transition-all group border-l-4 hover:border-l-[#b89e14] shadow-lg">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#b89e14]/10 text-[#b89e14] flex items-center justify-center text-xs font-black border border-[#b89e14]/20">
                        {f.user.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#b89e14]">{f.user}</span>
                        <span className="text-[10px] text-[#b89e14]/40 font-black uppercase tracking-widest">{f.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-[#b89e14]/70 text-sm leading-relaxed italic">"{f.comment}"</p>
                  </div>

                  <div className="flex items-center gap-3 min-w-[200px]">
                    {analysis ? (
                      <div className="flex flex-wrap gap-2 justify-end w-full">
                        <Badge value={analysis.sentiment} />
                        <Badge value={analysis.urgency} />
                      </div>
                    ) : (
                      <button 
                        onClick={() => runAnalysis(f.id, f.comment)}
                        disabled={loadingId === f.id}
                        className="w-full py-3 px-6 bg-[#b89e14] text-[#020617] text-[10px] font-black rounded-xl hover:opacity-90 transition-all border border-[#b89e14]/40 flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest"
                      >
                        {loadingId === f.id ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-brain"></i>}
                        AI TARA
                      </button>
                    )}
                  </div>
                </div>
                {analysis && (
                  <div className="mt-5 pt-5 border-t border-[#b89e14]/10 text-[11px] text-[#b89e14]/60 bg-[#b89e14]/5 p-4 rounded-2xl italic">
                    <span className="font-black text-[#b89e14] uppercase mr-3 tracking-widest border-r border-[#b89e14]/30 pr-3">AI Karar</span>
                    {analysis.summary}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SentimentStat = ({ label, val }: any) => {
  return (
    <div className="text-center px-6 py-3 rounded-2xl border border-[#b89e14]/20 bg-[#020617]/50 min-w-[100px]">
      <p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-50">{label}</p>
      <p className="text-xl font-black text-[#b89e14]">{val}</p>
    </div>
  );
};

const Badge = ({ value }: { value: string }) => {
  return (
    <span className="px-3 py-1.5 rounded-xl text-[9px] font-black border border-[#b89e14]/30 bg-[#b89e14]/10 text-[#b89e14] uppercase tracking-widest">
      {value}
    </span>
  );
};

export default SentimentPanel;
