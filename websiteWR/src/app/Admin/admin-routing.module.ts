import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ViewBinAllocationComponent } from './view-bin-allocation/view-bin-allocation.component';
import { AllocateDriversComponent } from './allocate-drivers/AllocateDriversComponent';
import { PickupDepotComponent } from './pickup-depot/pickup-depot.component';
import { AddBinComponent } from './add-bin/add-bin.component';
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
  {
    path: 'Add-Bin',
    component: AddBinComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
