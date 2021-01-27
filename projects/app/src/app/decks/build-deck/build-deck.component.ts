import {Component, OnInit} from '@angular/core';
import {Card} from 'pokemon-tcg-sdk-typescript/dist/classes/card';
import {BuildDeckService} from './build-deck.service';
import {takeUntil} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-build-deck',
  templateUrl: './build-deck.component.html',
  styleUrls: ['./build-deck.component.scss']
})
export class BuildDeckComponent implements OnInit {

  public isAddCardpanelOpen = false;
  public deck!: Card[];
  private destroy$ = new Observable<void>();

  constructor(private buildDeckService: BuildDeckService) {
  }

  ngOnInit(): void {
    this.loadDeck();
  }

  public toggleAddCardPanel(): void {
    this.isAddCardpanelOpen = !this.isAddCardpanelOpen;
  }

  public handleCardSelection(cards: Card[]): void {
    this.deck = [...cards];
  }

  public cardTrackByFn(index: number, item: Card): boolean {
    return !!item?.id;
  }

  public saveDeck(): void {
    this.buildDeckService.createNewDeck(this.deck);
  }

  private loadDeck(): void {
    this.buildDeckService.savedDeck$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(deck => this.deck = deck);
  }
}
