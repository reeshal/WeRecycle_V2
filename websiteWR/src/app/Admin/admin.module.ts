import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../Shared/shared.module';
import { NgZorroModule } from '../ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBinComponent } from './add-bin/add-bin.component';
import { ManageBinsComponent } from './manage-bins/manage-bins.component';

@NgModule({
  declarations: [AddBinComponent, ManageBinsComponent],
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
