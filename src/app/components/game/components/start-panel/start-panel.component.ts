import { Component, inject } from '@angular/core';
import { GameService } from '../../../../services/game/game.service';

@Component({
  selector: 'app-start-panel',
  standalone: true,
  imports: [],
  templateUrl: './start-panel.component.html',
  styleUrl: './start-panel.component.scss'
})
export class StartPanelComponent {
  gameService = inject(GameService)

  closeStartDialog() {
    this.gameService.closeStartDialog()
  }
}
