import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PageErrorComponent} from './page-error/page-error.component';

const routes: Routes = [
  {
    path: 'cards',
    loadChildren: () => import('./cards/cards.module').then((module) => module.CardsModule)
  },
  {
    path: 'decks',
    loadChildren: () => import('./decks/decks.module').then((module) => module.DecksModule)
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
