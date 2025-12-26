
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Selamlar! Ben Hydra AI. Gemini 3 Pro ile güçlendirilen yeni nesil zekayım. Size su yönetimi, teknik analizler veya merak ettiğiniz herhangi bir konuda nasıl yardımcı olabilirim?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    // Mesaj geçmişini hazırla (Basit format)
    const history = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    // Boş bir bot mesajı ekle ki stream oraya dolsun
    setMessages(prev => [...prev, { role: 'bot', content: '' }]);

    try {
      const stream = geminiService.processAssistantRequestStream(userMsg, history);
      let fullResponse = "";

      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].content = fullResponse;
          return newMsgs;
        });
      }
    } catch (error) {
      console.error("Streaming error:", error);
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1].content = "Üzgünüm, şu an bağlantı kurmakta zorlanıyorum. Lütfen birazdan tekrar deneyin.";
        return newMsgs;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-10rem)] flex flex-col bg-[#0f172a] rounded-[3rem] border border-[#b89e14]/20 shadow-2xl overflow-hidden animate-fadeIn relative">
      {/* Decorative Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#b89e14] to-transparent opacity-50"></div>
      
      <div className="p-6 bg-[#020617] border-b border-[#b89e14]/10 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-[#b89e14] flex items-center justify-center text-[#020617] shadow-2xl shadow-[#b89e14]/20 border border-[#b89e14]/40 transform rotate-3 hover:rotate-0 transition-transform">
              <i className="fa-solid fa-brain text-2xl"></i>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-[#020617]"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-[#b89e14] text-lg tracking-tight">HYDRA AI <span className="text-[10px] bg-[#b89e14]/10 px-2 py-0.5 rounded-md ml-2 border border-[#b89e14]/20">PRO</span></h3>
            </div>
            <p className="text-[10px] text-[#b89e14]/40 font-bold uppercase tracking-widest mt-0.5">Gemini 3 Pro Engine • Ultra Zeka</p>
          </div>
        </div>
        <div className="hidden md:flex gap-2">
          <div className="px-3 py-1.5 rounded-xl border border-[#b89e14]/10 text-[9px] font-black uppercase text-[#b89e14]/40">Gecikme: 45ms</div>
          <div className="px-3 py-1.5 rounded-xl border border-[#b89e14]/10 text-[9px] font-black uppercase text-[#b89e14]/40">Model: G-3-P</div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-8 bg-[#0f172a]/30 custom-scrollbar scroll-smooth">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeInUp`}>
            <div className={`max-w-[85%] lg:max-w-[70%] p-6 rounded-[2rem] shadow-2xl transition-all ${
              msg.role === 'user' 
                ? 'bg-[#b89e14] text-[#020617] border-[#b89e14] rounded-tr-none' 
                : 'bg-[#020617]/80 text-[#b89e14] border border-[#b89e14]/20 rounded-tl-none backdrop-blur-md'
            }`}>
              <div className="text-[14px] font-medium leading-[1.6] whitespace-pre-wrap">
                {msg.content || (
                  <div className="flex gap-2 py-2">
                    <div className="w-1.5 h-1.5 bg-[#b89e14] rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-[#b89e14] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-[#b89e14] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-[#020617] border-t border-[#b89e14]/10">
        <div className="relative flex items-center gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Bir soru sorun, analiz isteyin veya fikir danışın..."
            className="flex-1 bg-[#0f172a] border border-[#b89e14]/10 rounded-[1.5rem] px-8 py-5 text-sm text-[#b89e14] placeholder-[#b89e14]/20 outline-none transition-all focus:border-[#b89e14]/50 focus:bg-[#0f172a]/80 shadow-inner"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-[#b89e14] text-[#020617] w-16 h-16 rounded-[1.5rem] flex items-center justify-center hover:scale-105 active:scale-95 transition-all border border-[#b89e14]/40 shadow-xl disabled:opacity-20 disabled:scale-100 group"
          >
            {isLoading ? (
              <i className="fa-solid fa-circle-notch fa-spin text-xl"></i>
            ) : (
              <i className="fa-solid fa-paper-plane text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
            )}
          </button>
        </div>
        
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 opacity-40">
           <div className="flex items-center gap-2">
             <i className="fa-solid fa-bolt-lightning text-[10px]"></i>
             <p className="text-[9px] font-black uppercase tracking-widest">Gelişmiş Analitik</p>
           </div>
           <div className="flex items-center gap-2">
             <i className="fa-solid fa-shield-halved text-[10px]"></i>
             <p className="text-[9px] font-black uppercase tracking-widest">Güvenli Veri</p>
           </div>
           <div className="flex items-center gap-2">
             <i className="fa-solid fa-microchip text-[10px]"></i>
             <p className="text-[9px] font-black uppercase tracking-widest">Gemini 3 Pro</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
