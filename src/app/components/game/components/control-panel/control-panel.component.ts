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

  ngOnInit() {
    this.timer$ = this.gameService.getStatsTimer();
  }
}
