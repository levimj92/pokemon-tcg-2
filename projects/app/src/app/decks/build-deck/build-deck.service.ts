import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Card} from 'pokemon-tcg-sdk-typescript/dist/classes/card';

@Injectable({
  providedIn: 'root'
})
export class BuildDeckService {

  private savedDeck = new BehaviorSubject<Card[]>([]);
  public savedDeck$ = this.savedDeck.asObservable();

  public createNewDeck(deck: Card[]): void {
    this.savedDeck.next(deck);
  }

  constructor() {
  }
}
