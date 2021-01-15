import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ViewBinAllocationComponent } from './view-bin-allocation/view-bin-allocation.component';
import { AllocateDriversComponent } from './allocate-drivers/AllocateDriversComponent';
import { PickupDepotComponent } from './pickup-depot/pickup-depot.component';
const routes: Routes = [
  {
    path: 'View-Allocations',
    component: ViewBinAllocationComponent,
  },
  {
    path: 'Allocate-Drivers',
    component: AllocateDriversComponent,
  },
  {
    path: 'Pickup-Depot',
    component: PickupDepotComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
