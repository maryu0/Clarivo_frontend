import {
  Patient,
  Session,
  PhonemeData,
  TrendPoint,
  ComparisonPoint,
} from "../types/clinical";
export const patients: Patient[] = [
  {
    id: "p1",
    name: "Emma Thompson",
    age: 8,
    condition: "Rhotacism",
    lastSession: "2023-10-24",
    progress: 78,
    status: "active",
  },
  {
    id: "p2",
    name: "Liam Chen",
    age: 12,
    condition: "Stuttering",
    lastSession: "2023-10-23",
    progress: 65,
    status: "active",
  },
  {
    id: "p3",
    name: "Sophia Rodriguez",
    age: 6,
    condition: "Apraxia",
    lastSession: "2023-10-20",
    progress: 82,
    status: "active",
  },
  {
    id: "p4",
    name: "Noah Kim",
    age: 9,
    condition: "Lisp",
    lastSession: "2023-10-22",
    progress: 45,
    status: "active",
  },
];
export const recentSessions: Session[] = [
  {
    id: "s1",
    patientId: "p1",
    patientName: "Emma Thompson",
    date: "2023-10-24",
    duration: "45m",
    overallScore: 82,
    notes: "Great improvement on /r/ sounds",
  },
  {
    id: "s2",
    patientId: "p2",
    patientName: "Liam Chen",
    date: "2023-10-23",
    duration: "30m",
    overallScore: 68,
    notes: "Struggled with initial consonants",
  },
  {
    id: "s3",
    patientId: "p3",
    patientName: "Sophia Rodriguez",
    date: "2023-10-20",
    duration: "45m",
    overallScore: 88,
    notes: "Consistent performance",
  },
  {
    id: "s4",
    patientId: "p4",
    patientName: "Noah Kim",
    date: "2023-10-22",
    duration: "60m",
    overallScore: 72,
    notes: "Fatigue set in towards end",
  },
  {
    id: "s5",
    patientId: "p1",
    patientName: "Emma Thompson",
    date: "2023-10-18",
    duration: "45m",
    overallScore: 75,
    notes: "Previous session baseline",
  },
];
export const phonemeBreakdown: PhonemeData[] = [
  {
    phoneme: "/r/",
    accuracy: 65,
    count: 42,
    nativeAvg: 95,
    category: "Consonant",
  },
  {
    phoneme: "/s/",
    accuracy: 88,
    count: 35,
    nativeAvg: 98,
    category: "Consonant",
  },
  {
    phoneme: "/l/",
    accuracy: 72,
    count: 28,
    nativeAvg: 96,
    category: "Consonant",
  },
  {
    phoneme: "/th/",
    accuracy: 55,
    count: 15,
    nativeAvg: 94,
    category: "Cluster",
  },
  {
    phoneme: "/ae/",
    accuracy: 92,
    count: 50,
    nativeAvg: 99,
    category: "Vowel",
  },
  {
    phoneme: "/i/",
    accuracy: 95,
    count: 48,
    nativeAvg: 99,
    category: "Vowel",
  },
];
export const trendData: TrendPoint[] = [
  {
    date: "Oct 1",
    score: 65,
  },
  {
    date: "Oct 5",
    score: 68,
  },
  {
    date: "Oct 10",
    score: 72,
  },
  {
    date: "Oct 15",
    score: 70,
  },
  {
    date: "Oct 20",
    score: 78,
  },
  {
    date: "Oct 25",
    score: 82,
  },
];

// WPM (Words Per Minute) data for speech fluency tracking
export const wpmTrendData: TrendPoint[] = [
  {
    date: "Session 1",
    wpm: 72,
    score: 72,
  },
  {
    date: "Session 2",
    wpm: 78,
    score: 78,
  },
  {
    date: "Session 3",
    wpm: 81,
    score: 81,
  },
  {
    date: "Session 4",
    wpm: 85,
    score: 85,
  },
  {
    date: "Session 5",
    wpm: 88,
    score: 88,
  },
  {
    date: "Session 6",
    wpm: 89,
    score: 89,
  },
  {
    date: "Session 7",
    wpm: 92,
    score: 92,
  },
];

export const comparisonData: ComparisonPoint[] = [
  {
    metric: "Fluency",
    patient: 75,
    native: 95,
  },
  {
    metric: "Articulation",
    patient: 68,
    native: 92,
  },
  {
    metric: "Prosody",
    patient: 82,
    native: 90,
  },
  {
    metric: "Intelligibility",
    patient: 85,
    native: 98,
  },
];
