import { Component, inject } from '@angular/core';
import { GameService } from '../../../../services/game/game.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-type-quote',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './type-quote.component.html',
  styleUrl: './type-quote.component.scss',
})
export class TypeQuoteComponent {
  gameService = inject(GameService);
  initialQuote$!: Observable<string>;
  rightQuote$!: Observable<string>;
  currentCharacter$!: Observable<string>;
  isCurrentCharacterWrong$!: Observable<boolean>;

  ngOnInit() {
    this.initialQuote$ = this.gameService.getQuote();
    this.rightQuote$ = this.gameService.getRightPart();
    this.currentCharacter$ = this.gameService.getCurrentChar();
    this.isCurrentCharacterWrong$ = this.gameService.getIsCurrentCharWrong();
  }
}
