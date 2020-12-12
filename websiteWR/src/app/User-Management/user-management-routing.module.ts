import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegUsersComponent } from './reg-users/reg-users.component';
import { DriversComponent } from './drivers/drivers.component';

const routes:Routes = [
  {
    path:'Registered-Users',
    component:RegUsersComponent
  },
  {
    path:'Drivers',
    component:DriversComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
