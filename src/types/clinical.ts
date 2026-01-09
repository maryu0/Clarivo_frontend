export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  lastSession: string;
  progress: number; // 0-100
  status: "active" | "archived";
}
export interface Session {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  duration: string;
  overallScore: number;
  notes: string;
}
export interface PhonemeData {
  phoneme: string;
  accuracy: number;
  count: number;
  nativeAvg: number;
  category: "Vowel" | "Consonant" | "Cluster";
}
export interface TrendPoint {
  date: string;
  score: number;
  wpm?: number;
  patientId?: string;
}
export interface ComparisonPoint {
  metric: string;
  patient: number;
  native: number;
}
