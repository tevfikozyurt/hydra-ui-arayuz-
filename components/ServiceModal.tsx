
import React, { useState } from 'react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'diagnosis' | 'appointment' | 'tracking';
type ProblemType = 'leak' | 'offline' | 'abnormal' | null;

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>('diagnosis');
  const [problem, setProblem] = useState<ProblemType>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [ticketId] = useState(`HYD-2024-${Math.floor(100 + Math.random() * 900)}`);

  if (!isOpen) return null;

  const problems = [
    { id: 'leak', icon: 'fa-droplet-slash', label: 'Sızıntı Var', cost: '350 TL + Parça', ai: 'Vanayı otomatik kapattık. Ekipler gelene kadar lütfen ana vanayı kontrol edin.' },
    { id: 'offline', icon: 'fa-wifi-slash', label: 'Cihaz Çevrimdışı', cost: '150 TL', ai: 'Cihazın güç bağlantısını kontrol edin. 30 saniye bekleyip reset tuşuna basın.' },
    { id: 'abnormal', icon: 'fa-chart-line', label: 'Anormal Tüketim', cost: '250 TL', ai: 'Son 24 saatlik verileriniz inceleniyor. Kalibrasyon testi için ekip yönlendirilecek.' },
  ];

  const timeSlots = ["09:00", "11:00", "14:00", "16:00", "18:00"];

  const handleReset = () => {
    setStep('diagnosis');
    setProblem(null);
    setSelectedDate(null);
    setSelectedSlot(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl animate-fadeIn" onClick={handleReset}></div>

      <div className="relative w-full max-w-2xl bg-[#0f172a] border border-[#b89e14]/20 rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden animate-zoomIn">
        
        {/* Progress Stepper */}
        <div className="bg-[#020617]/50 px-8 py-6 border-b border-[#b89e14]/10">
          <div className="flex items-center justify-between max-w-md mx-auto relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#b89e14]/10 -translate-y-1/2 z-0"></div>
            <div className={`absolute top-1/2 left-0 h-0.5 bg-[#b89e14] -translate-y-1/2 z-0 transition-all duration-500 ${step === 'diagnosis' ? 'w-0' : step === 'appointment' ? 'w-1/2' : 'w-full'}`}></div>
            
            {[
              { s: 'diagnosis', i: 'fa-stethoscope' },
              { s: 'appointment', i: 'fa-calendar-check' },
              { s: 'tracking', i: 'fa-truck-fast' }
            ].map((item, idx) => (
              <div key={idx} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                step === item.s ? 'bg-[#b89e14] border-[#b89e14] text-[#020617] scale-110 shadow-[0_0_15px_rgba(184,158,20,0.4)]' : 
                (idx < ['diagnosis', 'appointment', 'tracking'].indexOf(step) ? 'bg-[#b89e14]/20 border-[#b89e14] text-[#b89e14]' : 'bg-[#0f172a] border-[#b89e14]/20 text-[#b89e14]/30')
              }`}>
                <i className={`fa-solid ${item.i} text-xs`}></i>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8">
          {step === 'diagnosis' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Sorununuz Nedir?</h3>
                <p className="text-xs text-[#b89e14]/50 font-bold uppercase tracking-widest">Akıllı Teşhis Sistemine Hoş Geldiniz</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {problems.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { setProblem(p.id as ProblemType); setStep('appointment'); }}
                    className="p-6 bg-[#020617] border border-[#b89e14]/10 rounded-3xl hover:border-[#b89e14] transition-all group text-center space-y-4"
                  >
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-[#b89e14]/5 text-[#b89e14] flex items-center justify-center border border-[#b89e14]/20 group-hover:bg-[#b89e14] group-hover:text-[#020617] transition-all">
                      <i className={`fa-solid ${p.icon} text-2xl`}></i>
                    </div>
                    <p className="font-black text-xs text-[#b89e14] uppercase tracking-widest">{p.label}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'appointment' && (
            <div className="space-y-8 animate-fadeIn">
              {/* AI Advice */}
              <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-[#020617] flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-robot text-sm"></i>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Hydra AI Tavsiyesi</p>
                  <p className="text-xs font-medium text-emerald-500/80 italic leading-relaxed">
                    "{problems.find(p => p.id === problem)?.ai}"
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-[#b89e14]/40 uppercase tracking-widest ml-1">Randevu Günü</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Pzt", "Sal", "Çar", "Per", "Cum"].map((day) => (
                      <button 
                        key={day}
                        onClick={() => setSelectedDate(day)}
                        className={`py-3 rounded-xl text-[10px] font-black border transition-all ${selectedDate === day ? 'bg-[#b89e14] text-[#020617] border-[#b89e14]' : 'bg-[#020617] text-[#b89e14] border-[#b89e14]/10 hover:border-[#b89e14]/40'}`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-[#b89e14]/40 uppercase tracking-widest ml-1">Uygun Saatler</label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <button 
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-3 rounded-xl text-[10px] font-black border transition-all ${selectedSlot === slot ? 'bg-[#b89e14] text-[#020617] border-[#b89e14]' : 'bg-[#020617] text-[#b89e14] border-[#b89e14]/10 hover:border-[#b89e14]/40'}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#020617] rounded-2xl border border-[#b89e14]/10 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black text-[#b89e14]/40 uppercase tracking-widest">Tahmini Maliyet</p>
                  <p className="text-lg font-black text-[#b89e14]">{problems.find(p => p.id === problem)?.cost}</p>
                </div>
                <button 
                  disabled={!selectedDate || !selectedSlot}
                  onClick={() => setStep('tracking')}
                  className="px-8 py-3 bg-[#b89e14] text-[#020617] rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-105 transition-all disabled:opacity-30 disabled:scale-100"
                >
                  Talebi Oluştur
                </button>
              </div>
            </div>
          )}

          {step === 'tracking' && (
            <div className="space-y-10 animate-fadeIn text-center py-6">
              <div className="space-y-3">
                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500 text-[#020617] flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-bounce">
                  <i className="fa-solid fa-check"></i>
                </div>
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Talep Alındı!</h4>
                <div className="inline-block px-4 py-1.5 bg-[#b89e14]/10 border border-[#b89e14]/30 rounded-full">
                  <p className="text-[10px] font-black text-[#b89e14] uppercase tracking-widest">Takip No: <span className="text-white ml-2">{ticketId}</span></p>
                </div>
              </div>

              {/* Progress Tracker (Vertical/Horizontal Stepper) */}
              <div className="max-w-md mx-auto space-y-6">
                <div className="relative flex justify-between">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-[#b89e14]/10 -translate-y-1/2"></div>
                  <div className="absolute top-1/2 left-0 w-1/4 h-1 bg-[#b89e14] -translate-y-1/2"></div>
                  
                  {['Sırada', 'Onaylandı', 'Yolda', 'Tamamlandı'].map((label, idx) => (
                    <div key={label} className="relative flex flex-col items-center gap-2">
                      <div className={`w-3 h-3 rounded-full border-2 ${idx === 0 ? 'bg-[#b89e14] border-[#b89e14]' : 'bg-[#0f172a] border-[#b89e14]/20'}`}></div>
                      <span className={`text-[8px] font-black uppercase tracking-widest ${idx === 0 ? 'text-[#b89e14]' : 'text-[#b89e14]/30'}`}>{label}</span>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 bg-[#b89e14]/5 border border-[#b89e14]/10 rounded-2xl">
                   <p className="text-xs font-medium text-[#b89e14]/70 leading-relaxed italic">
                    "Ekiplerimiz Nilüfer bölgesi için <span className="font-black text-[#b89e14]">{selectedDate} günü saat {selectedSlot}</span> randevusunu onayladı. Yaklaşık 10 dakika önce SMS ile bilgilendirileceksiniz."
                   </p>
                </div>
              </div>

              <button 
                onClick={handleReset}
                className="w-full py-4 bg-[#020617] text-[#b89e14] border border-[#b89e14]/20 rounded-2xl font-black uppercase tracking-widest hover:bg-[#b89e14]/10 transition-all"
              >
                Kapat
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-zoomIn { animation: zoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
};

export default ServiceModal;
