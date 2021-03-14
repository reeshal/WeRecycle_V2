import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManageDriversComponent } from './manage-drivers/manage-drivers.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AddBinsComponent } from './add-bins/add-bins.component';
import { EditBinsComponent } from './edit-bins/edit-bins.component';
import { ViewPickupsComponent } from './view-pickups/view-pickups.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  {
    path: 'View-Pickups',
    component: ViewPickupsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'Edit-Bins',
    component: EditBinsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'Add-Bins',
    component: AddBinsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'Manage-Drivers',
    component: ManageDriversComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'My-Profile',
    component: AdminProfileComponent,
    canActivate: [AdminGuard],
  },
  // { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
