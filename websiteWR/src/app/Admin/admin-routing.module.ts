import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddBinComponent } from './add-bin/add-bin.component';
import { ManageDriversComponent} from './manage-drivers/manage-drivers.component';

const routes: Routes = [
  {
    path: 'Add-Bin',
    component: AddBinComponent,
  },
  {
    path:'Manage-Drivers',
    component: ManageDriversComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
