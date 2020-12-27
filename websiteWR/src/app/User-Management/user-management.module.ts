import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegUsersComponent } from './reg-users/reg-users.component';
import { DriversComponent } from './drivers/drivers.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { NgZorroModule } from '../ng-zorro.module';
import { SharedModule} from '../Shared/shared.module';
import { MoreDetailsCardComponent } from './reg-users/more-details-card/more-details-card.component';
import { AddDriverFormComponent } from './drivers/add-driver-form/add-driver-form.component'

@NgModule({
  declarations: [RegUsersComponent, DriversComponent, MoreDetailsCardComponent, AddDriverFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroModule,
    NgxDatatableModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    RegUsersComponent,
    DriversComponent,
    MoreDetailsCardComponent,
    AddDriverFormComponent
  ]
})
export class UserManagementModule { }
