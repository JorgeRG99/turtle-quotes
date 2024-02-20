import { BehaviorSubject, Observable, Subject, takeUntil, timer } from 'rxjs';
import { StatsObject } from '../../models';

export class StatsService {
  private timerStop$ = new Subject<number>();
  private timer$ = new BehaviorSubject<number>(0);
  private totalWordsNumber$ = new Subject<number>();
  private completedWords$ = new BehaviorSubject<number>(0);
  private totalWords!: string[];
  private rightQuote$!: Observable<string>;
  private resultStats = new BehaviorSubject<StatsObject>({
    wpm: 0,
    accuracy: 0,
    totalTime: 0,
    totalErrors: 0,
    totalChars: 0,
    errorRate: 0,
  });

  constructor() {}

  // ----------------- METHODS -----------------
  start(): void {
    timer(0, 1000)
      .pipe(takeUntil(this.timerStop$))
      .subscribe((val: number) => this.timer$.next(val));
  }

  stop(): void {
    this.timerStop$.next(0);
    this.timerStop$.complete();
  }

  generateStats(
    totalCharsTyped: number,
    totalErrors: number,
    totalSuccesses: number
  ): void {    
    this.resultStats.next({
      wpm: Math.round((totalCharsTyped / 5 / this.timer$.value) * 60),
      accuracy: parseInt(((totalSuccesses / totalCharsTyped) * 100).toFixed(2)),
      totalTime: this.timer$.value,
      totalErrors: totalErrors,
      totalChars: totalCharsTyped,
      errorRate: parseInt(((totalErrors / totalCharsTyped) * 100).toFixed(2)),
    });
  }

  // ----------------- GETTERS -----------------
  getTimer(): Observable<number> {
    return this.timer$.asObservable();
  }

  getTotalWords(): Observable<number> {
    return this.totalWordsNumber$.asObservable();
  }

  getCompletedWords(): Observable<number> {
    return this.completedWords$.asObservable();
  }

  getResults(): Observable<StatsObject> {
    return this.resultStats.asObservable();
  }

  // ----------------- SETTERS -----------------
  setQuoteData(value: string[], rightString$: Observable<string>): void {
    this.totalWordsNumber$.next(value.length);
    this.totalWords = value;
    this.rightQuote$ = rightString$;

    this.rightQuote$.subscribe((newValue: string) => {
      this.completedWords$.next(
        newValue.split(' ').filter((word) => this.totalWords.includes(word))
          .length
      );
    });
  }
}
