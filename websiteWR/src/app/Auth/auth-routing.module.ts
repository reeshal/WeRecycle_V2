import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{ path: 'Login', component: LoginComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
