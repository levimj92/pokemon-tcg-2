import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TcgCardComponent} from './tcg-card/tcg-card.component';
import {TcgCardListComponent} from './card-list/tcg-card-list.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';


@NgModule({
  declarations: [
    TcgCardComponent,
    TcgCardListComponent
  ],
  exports: [
    TcgCardComponent,
    TcgCardListComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    OverlayModule,
    PortalModule
  ]
})
export class SharedModule {
}
