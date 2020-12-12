import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import { RouterModule } from '@angular/router';
import { NgZorroModule } from '../ng-zorro.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class SharedModule { }
