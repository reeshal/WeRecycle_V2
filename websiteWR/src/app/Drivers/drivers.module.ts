import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverProfileComponent } from './driver-profile/driver-profile.component';
import { SharedModule } from '../Shared/shared.module';
import { NgZorroModule } from '../ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DriversRoutingModule } from './drivers-routing.module';
import { UpdatePasswordComponent } from './driver-profile/update-password/update-password.component';
import { AddPickupComponent } from './add-pickup/add-pickup.component';


@NgModule({
  declarations: [DriverProfileComponent, UpdatePasswordComponent, AddPickupComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule,
    DriversRoutingModule
  ]
})
export class DriversModule { }
