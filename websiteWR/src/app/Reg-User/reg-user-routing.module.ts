import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PickupRequestsComponent } from './pickup-requests/pickup-requests.component';

const routes:Routes = [
  {
    path:'My-Pickup-Requests',
    component:PickupRequestsComponent
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
export class RegUserRoutingModule { }
