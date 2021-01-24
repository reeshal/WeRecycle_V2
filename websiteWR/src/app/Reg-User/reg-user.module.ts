import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroModule } from '../ng-zorro.module';
import { SharedModule} from '../Shared/shared.module';
import { PickupRequestsComponent } from './pickup-requests/pickup-requests.component';
import { BinRequestsComponent } from './bin-requests/bin-requests.component';

@NgModule({
  declarations: [PickupRequestsComponent, BinRequestsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroModule,
    NgxDatatableModule,
    SharedModule,
  ],
  exports:[
    PickupRequestsComponent,
    BinRequestsComponent
  ]
})
export class RegUserModule { }
