import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegUsersComponent } from './reg-users/reg-users.component';
import { DriversComponent } from './drivers/drivers.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { NgZorroModule } from '../ng-zorro.module';

@NgModule({
  declarations: [RegUsersComponent, DriversComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroModule,
    NgxDatatableModule
  ],
  exports:[
    RegUsersComponent,
    DriversComponent
  ]
})
export class UserManagementModule { }
