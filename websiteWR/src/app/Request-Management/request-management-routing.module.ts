import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BinRequestsComponent} from './bin-requests/bin-requests.component';
import { PickupRequestsComponent} from './pickup-requests/pickup-requests.component'

const routes:Routes = [
  {
    path:'Bins',
    component:BinRequestsComponent
  },
  {
    path:'Pickups',
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
export class RequestManagementRoutingModule { }
