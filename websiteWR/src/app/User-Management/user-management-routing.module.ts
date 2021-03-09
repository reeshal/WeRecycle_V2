import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DriversComponent } from './drivers/drivers.component';

const routes:Routes = [
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
