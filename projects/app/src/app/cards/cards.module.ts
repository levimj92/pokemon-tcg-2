import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardsSearchComponent} from './cards-search/cards-search.component';
import {SharedModule} from '../shared/shared.module';
import {CardsRoutingModule} from './cards-routing.module';

@NgModule({
  declarations: [
    CardsSearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CardsRoutingModule,
  ]
})
export class CardsModule {
}
