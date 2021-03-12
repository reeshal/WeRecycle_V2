import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManageBinsComponent } from './manage-bins/manage-bins.component';
import { ManageDriversComponent } from './manage-drivers/manage-drivers.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

const routes: Routes = [
  {
    path: 'Manage-Bins',
    component: ManageBinsComponent,
  },
  {
    path: 'Manage-Drivers',
    component: ManageDriversComponent,
  },
  {
    path: 'My-Profile',
    component: AdminProfileComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
