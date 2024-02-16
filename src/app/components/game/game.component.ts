import { Component } from '@angular/core';
import { TypeQuoteComponent } from './components/type-quote/type-quote.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [TypeQuoteComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

}
