import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverProfileComponent } from './driver-profile/driver-profile.component';
import { SharedModule } from '../Shared/shared.module';
import { NgZorroModule } from '../ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DriversRoutingModule } from './drivers-routing.module';


@NgModule({
  declarations: [DriverProfileComponent],
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
