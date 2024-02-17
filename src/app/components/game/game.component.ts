import { Component } from '@angular/core';
import { TypeQuoteComponent } from './components/type-quote/type-quote.component';
import { StartPanelComponent } from './components/start-panel/start-panel.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [TypeQuoteComponent, StartPanelComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

}
