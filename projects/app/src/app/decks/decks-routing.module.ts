import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BuildDeckComponent} from './build-deck/build-deck.component';

const routes: Routes = [
  {
    path: 'build',
    component: BuildDeckComponent
  },
  {
    path: '',
    redirectTo: 'build',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecksRoutingModule {
}
