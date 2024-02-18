import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from '../../../../services/game/game.service';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent {
  timer$!: Observable<number>
  gameService = inject(GameService);
  totalWords!: Observable<number>;
  completedWords!: Observable<number>;

  ngOnInit() {
    this.timer$ = this.gameService.getStatsTimer();
    this.totalWords = this.gameService.getTotalWords();
    this.completedWords = this.gameService.getCompletedWords();
  }
}
