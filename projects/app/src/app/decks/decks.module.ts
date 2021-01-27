import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecksRoutingModule } from './decks-routing.module';
import { BuildDeckComponent } from './build-deck/build-deck.component';
import {SharedModule} from '../shared/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [BuildDeckComponent],
  imports: [
    CommonModule,
    DecksRoutingModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ]
})
export class DecksModule { }
