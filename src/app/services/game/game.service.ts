import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  fromEvent,
  map,
} from 'rxjs';
import { ApiResultObject, StatsObject } from '../../models';
import { SubjectManager } from '../../utils/subject-manager.utility';
import { StatsService } from '../stats/stats.service';
import { APP_ROUTES } from '../../../config';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl: string = environment.apiBaseUrl;
  private quote = new BehaviorSubject('');
  private right = new BehaviorSubject('');
  private currentChar = new BehaviorSubject('');
  private isCurrentCharWrong = new BehaviorSubject(false);
  private keydown = fromEvent<KeyboardEvent>(document, 'keydown');
  private keydownSubscription: Subscription;
  private $isGameStartedSubject = new SubjectManager(false);
  private $isGameEndedSubject = new SubjectManager(false);
  private totalErrors = 0;
  private totalSuccesses = 0;
  private totalCharsTyped = 0;
  private stats = new StatsService();

  constructor(private httpClient: HttpClient, private router: Router) {
    this.requestQuote();

    this.keydownSubscription = this.keydown.subscribe((e) => {
      if (!this.$isGameStartedSubject.getSubjectValue()) {
        this.startOnEnter(e);
        return;
      } else {
        if (e.key === this.currentChar.getValue()) this.handleCorrectInput();
        else if (e.key !== 'CapsLock' && e.key !== 'Shift') {
          this.totalCharsTyped++;
          this.totalErrors++;
          this.setIsCurrentCharWrong(true);
        }
      }
    });
  }

  // ----------------- METHODS -----------------
  requestQuote(): void {
    this.httpClient
      .get<ApiResultObject[]>(this.apiUrl)
      .pipe(map((result) => result[0].content))
      .subscribe((quoteContent) => {
        this.stats.setQuoteData(quoteContent.split(' '), this.right);
        this.setQuote(quoteContent.slice(1));
        this.setCurrentChar(quoteContent[0]);
      });
  }

  handleCorrectInput() {
    this.totalSuccesses++;
    this.totalCharsTyped++;
    this.setRightPart(this.right.value + this.currentChar.value);
    this.setCurrentChar(this.quote.value[0]);
    this.setQuote(this.quote.value.slice(1));

    if (this.isCurrentCharWrong.value) {
      this.setIsCurrentCharWrong(false);
    }
    if (!this.currentChar.value) this.finishGame();
  }

  startOnEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.closeStartDialog();
    }
  }

  closeStartDialog() {
    this.$isGameStartedSubject.setSubject(true);
    this.stats.start();
  }

  finishGame() {
    this.stats.generateStats(
      this.totalCharsTyped,
      this.totalErrors,
      this.totalSuccesses
    );
    this.keydownSubscription.unsubscribe();
    this.$isGameEndedSubject.setSubject(true);
    this.stats.stop();
    this.router.navigate([APP_ROUTES.STATS]);
  }

  resetGame() {
    this.stats = new StatsService();
    this.totalErrors = 0;
    this.totalSuccesses = 0;
    this.totalCharsTyped = 0;
    this.apiUrl = environment.apiBaseUrl;
    this.quote = new BehaviorSubject('');
    this.right = new BehaviorSubject('');
    this.currentChar = new BehaviorSubject('');
    this.isCurrentCharWrong = new BehaviorSubject(false);
    this.keydown = fromEvent<KeyboardEvent>(document, 'keydown');
    this.$isGameStartedSubject = new SubjectManager(false);
    this.$isGameEndedSubject = new SubjectManager(false);

    this.requestQuote();

    this.keydownSubscription = this.keydown.subscribe((e) => {
      if (!this.$isGameStartedSubject.getSubjectValue()) {
        this.startOnEnter(e);
        return;
      } else {
        if (e.key === this.currentChar.getValue()) this.handleCorrectInput();
        else if (e.key !== 'CapsLock' && e.key !== 'Shift') {
          this.totalCharsTyped++;
          this.totalErrors++;
          this.setIsCurrentCharWrong(true);
        }
      }
    });

    this.router.navigate([APP_ROUTES.HOME]);
  }

  // ----------------- GETTERS -----------------
  getQuote(): Observable<string> {
    return this.quote.asObservable();
  }

  getRightPart(): Observable<string> {
    return this.right.asObservable();
  }

  getCurrentChar(): Observable<string> {
    return this.currentChar.asObservable();
  }

  getIsCurrentCharWrong(): Observable<boolean> {
    return this.isCurrentCharWrong.asObservable();
  }

  getIsGameStartedSubject(): SubjectManager {
    return this.$isGameStartedSubject;
  }

  getStatsTimer(): Observable<number> {
    return this.stats.getTimer();
  }

  getTotalWords(): Observable<number> {
    return this.stats.getTotalWords();
  }

  getCompletedWords(): Observable<number> {
    return this.stats.getCompletedWords();
  }

  getStatsResult(): Observable<StatsObject> {
    return this.stats.getResults();
  }

  // ----------------- SETTERS -----------------
  setQuote(value: string): void {
    this.quote.next(value);
  }

  setRightPart(value: string): void {
    this.right.next(value);
  }

  setCurrentChar(value: string): void {
    this.currentChar.next(value);
  }

  setIsCurrentCharWrong(value: boolean): void {
    this.isCurrentCharWrong.next(value);
  }
}
