import { Component, inject } from '@angular/core';
import { TypeQuoteComponent } from './components/type-quote/type-quote.component';
import { StartPanelComponent } from './components/start-panel/start-panel.component';
import { GameService } from '../../services/game.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [TypeQuoteComponent, StartPanelComponent, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  isGameStarted$!: Observable<boolean>
  gameService = inject(GameService);

  ngOnInit() {
    this.isGameStarted$ = this.gameService.getIsGameStartedSubject().getSubject();
  }
}
