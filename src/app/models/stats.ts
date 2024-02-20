export interface StatsObject {
  [key: string]: number;
  wpm: number;
  accuracy: number;
  totalTime: number;
  totalErrors: number;
  totalChars: number;
  errorRate: number;
}
