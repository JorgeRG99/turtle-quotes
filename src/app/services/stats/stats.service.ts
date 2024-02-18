import { BehaviorSubject, Observable, Subject, takeUntil, timer } from 'rxjs';

export class StatsService {
  private timerStop$ = new Subject<number>();
  private timer$ = new BehaviorSubject<number>(0);
  private totalWordsNumber$ = new Subject<number>();
  private completedWords$ = new BehaviorSubject<number>(0);
  private totalWords!: string[];
  private rightQuote$!: Observable<string>;

  constructor() {}

  start(): void {
    timer(0, 1000)
      .pipe(takeUntil(this.timerStop$))
      .subscribe((val: number) => this.timer$.next(val));
  }

  stop(): void {
    this.timerStop$.next(0);
    this.timerStop$.complete();
  }

  // GETTERS
  getTimer(): Observable<number> {
    return this.timer$.asObservable();
  }

  getTotalWords(): Observable<number> {
    return this.totalWordsNumber$.asObservable();
  }

  getCompletedWords(): Observable<number> {
    return this.completedWords$.asObservable();
  }

  // SETTERS
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
