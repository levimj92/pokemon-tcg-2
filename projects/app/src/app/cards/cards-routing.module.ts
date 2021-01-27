import {NgModule} from '@angular/core';
import {CardsSearchComponent} from './cards-search/cards-search.component';
import {Route, RouterModule} from '@angular/router';

const ROUTES: Route[] = [
  {
    path: 'browse',
    component: CardsSearchComponent
  },
  {
    path: '',
    redirectTo: 'browse',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class CardsRoutingModule {
}
