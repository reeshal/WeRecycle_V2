import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DriverProfileComponent } from './driver-profile/driver-profile.component';
import { AddPickupComponent } from './add-pickup/add-pickup.component';
import { DriverGuard } from './driver.guard';

const routes: Routes = [
  {
    path: 'My-Profile',
    component: DriverProfileComponent,
    canActivate: [DriverGuard],
  },
  {
    path: 'Add-Pickup',
    component: AddPickupComponent,
    canActivate: [DriverGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class DriversRoutingModule {}
