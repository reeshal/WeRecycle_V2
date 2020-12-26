import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ViewBinAllocationComponent } from './view-bin-allocation/view-bin-allocation.component';
const routes: Routes = [
  {
    path: 'View-Allocations',
    component: ViewBinAllocationComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
