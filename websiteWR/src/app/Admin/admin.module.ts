import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../Shared/shared.module';
import { NgZorroModule } from '../ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageBinsComponent } from './manage-bins/manage-bins.component';
import { ManageDriversComponent } from './manage-drivers/manage-drivers.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { DriverCardComponent } from './manage-drivers/driver-card/driver-card.component';

@NgModule({
  declarations: [ManageBinsComponent],

@NgModule({
  declarations: [ ManageDriversComponent, AdminProfileComponent, DriverCardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
