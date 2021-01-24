import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewBinAllocationComponent } from './view-bin-allocation/view-bin-allocation.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../Shared/shared.module';
import { NgZorroModule } from '../ng-zorro.module';
import { PickupBinDialogComponent } from './view-bin-allocation/pickup-bin-dialog/pickup-bin-dialog.component';
import { RouteDialogComponent } from './view-bin-allocation/route-dialog/route-dialog.component';
import { AllocateDriversComponent } from './allocate-drivers/AllocateDriversComponent';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PickupDepotComponent } from './pickup-depot/pickup-depot.component';
import { AddBinComponent } from './add-bin/add-bin.component';

@NgModule({
  declarations: [
    ViewBinAllocationComponent,
    PickupBinDialogComponent,
    RouteDialogComponent,
    AllocateDriversComponent,
    PickupDepotComponent,
    AddBinComponent,
  ],
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
