import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private timerStop$ = new Subject<number>();
  private timer$ = new BehaviorSubject<number>(0);

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

  getTimer(): Observable<number> {
    return this.timer$.asObservable();
  }
}
