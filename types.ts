
export type AppView = 'dashboard' | 'assistant' | 'sentiment' | 'recommendations' | 'pricing' | 'simulator' | 'leaderboard';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'info' | 'success';
  timestamp: string;
  read: boolean;
}

export interface Feedback {
  id: string;
  user: string;
  comment: string;
  sentiment?: 'Mutlu' | 'Endişeli' | 'Kızgın';
  urgency?: 'Düşük' | 'Orta' | 'Yüksek';
  timestamp: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  roi: string;
  price: string;
  estimatedSaving: string;
  waterSavingVolume: string;
  category: 'Cihaz' | 'Plan' | 'Davranış' | 'Tesisat';
}

export interface SavingTask {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'new';
  progress?: number;
  note?: string;
}

export interface UsageData {
  month: string;
  consumption: number;
}
