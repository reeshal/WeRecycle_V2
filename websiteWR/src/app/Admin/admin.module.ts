import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewBinAllocationComponent } from './view-bin-allocation/view-bin-allocation.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../Shared/shared.module';
import { NgZorroModule } from '../ng-zorro.module';
import { PickupBinDialogComponent } from './view-bin-allocation/pickup-bin-dialog/pickup-bin-dialog.component';

@NgModule({
  declarations: [ViewBinAllocationComponent, PickupBinDialogComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule, NgZorroModule],
})
export class AdminModule {}
