import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewBinAllocationComponent } from './view-bin-allocation/view-bin-allocation.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../Shared/shared.module';
import { NgZorroModule } from '../ng-zorro.module';
import { PickupBinDialogComponent } from './view-bin-allocation/pickup-bin-dialog/pickup-bin-dialog.component';
import { RouteDialogComponent } from './view-bin-allocation/route-dialog/route-dialog.component';
import { AllocateDriversComponent } from './allocate-drivers/AllocateDriversComponent';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ViewBinAllocationComponent,
    PickupBinDialogComponent,
    RouteDialogComponent,
    AllocateDriversComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgZorroModule,
    FormsModule,
  ],
})
export class AdminModule {}
