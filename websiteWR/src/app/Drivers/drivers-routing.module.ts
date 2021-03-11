import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DriverProfileComponent } from './driver-profile/driver-profile.component';

const routes: Routes = [
  {
    path: 'My-Profile',
    component: DriverProfileComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class DriversRoutingModule { }
