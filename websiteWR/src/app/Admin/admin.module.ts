import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../Shared/shared.module';
import { NgZorroModule } from '../ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageDriversComponent } from './manage-drivers/manage-drivers.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { DriverCardComponent } from './manage-drivers/driver-card/driver-card.component';
import { AddBinsComponent } from './add-bins/add-bins.component';
import { EditBinsComponent } from './edit-bins/edit-bins.component';
import { ViewPickupsComponent } from './view-pickups/view-pickups.component';
import { AdminGuard } from './admin.guard';
import { BinActionsComponent } from './bin-actions/bin-actions.component';
import { ViewPickupModalComponent } from './view-pickups/view-pickup-modal/view-pickup-modal.component';

@NgModule({
  declarations: [
    ManageDriversComponent,
    AdminProfileComponent,
    DriverCardComponent,
    AddBinsComponent,
    EditBinsComponent,
    ViewPickupsComponent,
    BinActionsComponent,
    ViewPickupModalComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AdminGuard],
})
export class AdminModule {}
