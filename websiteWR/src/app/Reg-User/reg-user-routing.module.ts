import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PickupRequestsComponent } from './pickup-requests/pickup-requests.component';
import { BinRequestsComponent } from './bin-requests/bin-requests.component';

const routes:Routes = [
  {
    path:'My-Pickup-Requests',
    component:PickupRequestsComponent
  },
  {
    path:'New-Bin-Requests',
    component:BinRequestsComponent
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
