
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const geminiService = {
  // Simülatör Analizcisi
  async analyzeSimulation(data: { city: string, dailyLiters: number, aboveAvg: number }) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `${data.city} şehrinde günlük ${data.dailyLiters} litre su tüketen bir kullanıcı için (Türkiye ortalamasının %${data.aboveAvg} üzerinde) kısa ve çarpıcı bir sızıntı analizi ve tasarruf uyarısı yaz.`,
      config: {
        systemInstruction: "Sen profesyonel bir su yönetimi analistisin. Teknik terimler kullanarak (debi, hidrostatik basınç vb.) kısa bir uyarı metni oluştur.",
      },
    });
    return response.text;
  },

  // 1. Üst Seviye Akışlı NLP Asistanı
  async *processAssistantRequestStream(query: string, history: {role: string, parts: {text: string}[]}[] = []) {
    const model = 'gemini-3-pro-preview';
    
    const stream = await ai.models.generateContentStream({
      model: model,
      contents: [
        ...history,
        { role: 'user', parts: [{ text: query }] }
      ],
      config: {
        systemInstruction: `Sen Hydra AI'sın. Gemini 3 Pro mimarisi üzerine kurulu, dünyanın en gelişmiş su yönetimi ve genel amaçlı yapay zekasısın. 
        Sadece su yönetimi değil, bilimden teknolojiye, sanattan felsefeye kadar her konuda derinlemesine, rasyonel ve yaratıcı cevaplar verebilirsin.
        Cevapların her zaman yüksek entelektüel seviyede, nazik, çözüm odaklı ve profesyonel olmalıdır. 
        Kullanıcı su ile ilgili teknik bir şey sorduğunda uzmanlığını konuştur, genel bir şey sorduğunda ise dünyanın en zeki danışmanı gibi davran.`,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    for await (const chunk of stream) {
      yield chunk.text;
    }
  },

  // 2. Sentiment Analysis Logic
  async analyzeSentiment(feedback: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Bu kullanıcı yorumunu analiz et: "${feedback}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: {
              type: Type.STRING,
              description: "Kullanıcının duygusu (Mutlu, Endişeli, Kızgın)",
            },
            urgency: {
              type: Type.STRING,
              description: "Aciliyet seviyesi (Düşük, Orta, Yüksek)",
            },
            summary: {
              type: Type.STRING,
              description: "Yorumun kısa özeti",
            }
          },
          required: ["sentiment", "urgency", "summary"]
        },
      },
    });
    return JSON.parse(response.text);
  },

  // 3. Recommendation Engine Logic
  async getPersonalizedRecommendations(usageData: any) {
    // Daha hızlı yanıt için gemini-3-flash-preview modeline geçildi
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Aşağıdaki kullanım verilerine göre kişiselleştirilmiş 6 adet farklı kategoride tasarruf önerisi sun. Öneriler gerçekçi, ölçülebilir ve aksiyon alınabilir olmalıdır: ${JSON.stringify(usageData)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              roi: { type: Type.STRING, description: "Amortisman süresi (örn: 3 Ay, 1 Yıl)" },
              price: { type: Type.STRING, description: "Maliyet (örn: 0 TL, 450 TL)" },
              estimatedSaving: { type: Type.STRING, description: "Aylık TL tasarrufu (örn: 120 TL)" },
              waterSavingVolume: { type: Type.STRING, description: "Aylık su hacmi tasarrufu (örn: 2.500 Litre)" },
              category: { type: Type.STRING, description: "Cihaz, Plan, Davranış veya Tesisat" }
            },
            required: ["id", "title", "description", "roi", "price", "estimatedSaving", "waterSavingVolume", "category"]
          }
        },
      },
    });
    return JSON.parse(response.text);
  }
};
