import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManageDriversComponent } from './manage-drivers/manage-drivers.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AddBinsComponent } from './add-bins/add-bins.component';
import { EditBinsComponent } from './edit-bins/edit-bins.component';

const routes: Routes = [
  {
    path: 'Edit-Bins',
    component: EditBinsComponent,
  },
  {
    path: 'Add-Bins',
    component: AddBinsComponent,
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
