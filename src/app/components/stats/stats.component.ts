import { Component, inject } from '@angular/core';
import { GameService } from '../../services/game/game.service';
import { StatsObject } from '../../models';
import { Subscription} from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReloadComponent } from './components/reload/reload.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, ReloadComponent],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent {
  gameService = inject(GameService);
  statsSuscription!: Subscription;
  stats: StatsObject = {
    wpm: 0,
    errorRate: 0,
    accuracy: 0,
    totalTime: 0,
    totalChars: 0,
    totalErrors: 0
  }

  async animateValue(target: number, duration: number, key:string) {
    const increment = target / ((duration / 1000) * 60);
    const intervalId = setInterval(() => {
      if (this.stats[key] < target) {
        this.stats[key] += increment;
      } else {
        clearInterval(intervalId);
        this.stats[key] = target;
      }
    }, 1000 / 60);
  }

  ngOnInit() {
    this.statsSuscription = this.gameService
      .getStatsResult()
      .subscribe((stats: StatsObject) => {        
        Object.keys(stats).forEach((key: any) => {
          this.animateValue(stats[key], 3000, key);
        })
      });
  }

  ngOnDestroy() {
    if (this.statsSuscription) {
      this.statsSuscription.unsubscribe()
    };
  }

  playAgain() {
    this.gameService.resetGame();
  }
}
