import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegUsersComponent } from './reg-users/reg-users.component';
import { DriversComponent } from './drivers/drivers.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { NgZorroModule } from '../ng-zorro.module';
import { SharedModule} from '../Shared/shared.module'

@NgModule({
  declarations: [RegUsersComponent, DriversComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroModule,
    NgxDatatableModule,
    SharedModule,
    FormsModule
  ],
  exports:[
    RegUsersComponent,
    DriversComponent
  ]
})
export class UserManagementModule { }
