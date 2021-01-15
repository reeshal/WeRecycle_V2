import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NgZorroModule } from '../ng-zorro.module';
import { SharedModule } from '../Shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    NgZorroModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
