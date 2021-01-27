import {Component, OnInit} from '@angular/core';
import {TcgCardListService} from '../../shared/card-list/tcg-card-list.service';
import {Card} from 'pokemon-tcg-sdk-typescript/dist/classes/card';

@Component({
  selector: 'app-cards-search',
  templateUrl: './cards-search.component.html',
  styleUrls: ['./cards-search.component.scss'],
  providers: [TcgCardListService]
})
export class CardsSearchComponent implements OnInit {

  constructor() {
  }

  public ngOnInit(): void {
  }
}
