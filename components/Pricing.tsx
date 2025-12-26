
import React from 'react';

const Pricing: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 animate-fadeIn pb-24 text-[#b89e14]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Bireysel - Evim Güvende */}
        <PriceCard 
          topLabel="BİREYSEL"
          title="Evim Güvende" 
          price="1.499,99 TL"
          subPrice="Cihaz bedeli · Abonelik: Ücretsiz"
          items={[
            "Büyük su kaçaklarında telefona anlık uyarı",
            "Musluk açık kaldığında bildirim",
            "Kolay kurulum"
          ]}
          footer="Sadece temel koruma isteyenler için."
        />
        
        {/* Profesyonel - Akıllı Tasarruf */}
        <PriceCard 
          topLabel="PROFESYONEL"
          title="Akıllı Tasarruf" 
          price="59.99 TL"
          subPrice="/ay · Cihaz bedeli 1.499,99 TL"
          isFeatured={true}
          badge="En Çok Tercih Edilen"
          items={[
            "Yapay zeka ile damlatan musluk tespiti",
            "Gelecek ayki su faturası tahmini",
            "%30'a varan tasarruf rehberliği"
          ]}
          footer="Faturasını düşürmek isteyen aileler için."
        />

        {/* Kurumsal - Tam Yönetim */}
        <PriceCard 
          topLabel="KURUMSAL"
          title="Tam Yönetim" 
          price="Teklif"
          subPrice="Alın"
          items={[
            "Merkezi Yönetim Sistemi: Tüm şube veya binaları tek ekrandan izleme",
            "ERP Entegrasyonu: Mevcut kurumsal yazılımlarınızla tam uyumlu çalışma",
            "Gelişmiş Raporlama: ESG ve sürdürülebilirlik standartlarına uygun otomatik PDF raporları"
          ]}
          footer="Büyük ölçekli projeler için özel teknik destek ve keşif hizmeti dahildir."
          extra="⭐ Sınırlı Sayıda Kurumsal İş Ortaklığı"
        />
      </div>
    </div>
  );
};

interface PriceCardProps {
  topLabel: string;
  title: string;
  price: string;
  subPrice: string;
  items: string[];
  footer: string;
  isFeatured?: boolean;
  badge?: string;
  extra?: string;
}

const PriceCard: React.FC<PriceCardProps> = ({ 
  topLabel, 
  title, 
  price, 
  subPrice, 
  items, 
  footer, 
  isFeatured = false, 
  badge,
  extra 
}) => (
  <div className={`bg-[#0f172a] rounded-[2.5rem] p-8 border ${isFeatured ? 'border-[#b89e14] shadow-[0_0_30px_rgba(184,158,20,0.15)] scale-105 z-10' : 'border-[#b89e14]/20'} flex flex-col relative transition-all duration-300 hover:border-[#b89e14]/50 min-h-[650px]`}>
    {badge && (
      <div className="absolute top-6 right-6 bg-[#b89e14] text-[#020617] text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-wider shadow-lg">
        {badge}
      </div>
    )}
    
    <div className="mb-8">
      <p className="text-[11px] font-black text-[#b89e14]/50 uppercase tracking-[0.2em] mb-2">{topLabel}</p>
      <h4 className="text-2xl font-black text-white mb-6 tracking-tight">{title}</h4>
      <div className="flex flex-col mb-2">
        <span className="text-4xl font-black text-[#b89e14]">{price}</span>
        <span className="text-[11px] text-[#b89e14]/60 font-medium mt-1 uppercase tracking-wide">{subPrice}</span>
      </div>
    </div>

    <ul className="space-y-5 mb-10 flex-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-4">
          <div className="mt-1 shrink-0">
            <i className="fa-solid fa-check text-[#b89e14] text-xs"></i>
          </div>
          <span className="text-[13px] font-medium text-[#b89e14]/80 leading-snug">{item}</span>
        </li>
      ))}
    </ul>

    <div className="mt-auto space-y-6">
      <button className="w-full py-4 bg-[#b89e14] text-[#020617] rounded-2xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl text-sm border border-[#b89e14]/30">
        Satın Al
      </button>
      
      <p className="text-[11px] text-[#b89e14]/40 font-medium text-center italic px-4">
        {footer}
      </p>

      {extra && (
        <div className="pt-2 text-center">
          <p className="text-[10px] font-black text-[#b89e14] uppercase tracking-wider">
            {extra}
          </p>
        </div>
      )}
    </div>
  </div>
);

export default Pricing;
