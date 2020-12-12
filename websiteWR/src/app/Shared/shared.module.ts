import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import { RouterModule } from '@angular/router';
import { NgZorroModule } from '../ng-zorro.module';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [NavbarComponent, SpinnerComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroModule
  ],
  exports:[
    NavbarComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
