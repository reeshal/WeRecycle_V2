import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManageBinsComponent } from './manage-bins/manage-bins.component';
const routes: Routes = [
  {
    path: 'Manage-Bins',
    component: ManageBinsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
