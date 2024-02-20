import { Component, inject } from '@angular/core';
import { GameService } from '../../services/game/game.service';
import { StatsObject } from '../../models';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent {
  gameService = inject(GameService);
  statsSuscription!: Subscription;
  statsResult!: StatsObject;

  ngOnInit() {
    this.statsSuscription = this.gameService
      .getStatsResult()
      .subscribe((stats: StatsObject) => this.statsResult = stats);
  }

  ngOnDestroy() {
    if (this.statsSuscription) this.statsSuscription.unsubscribe();
  }
}
