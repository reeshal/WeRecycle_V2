import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroModule } from '../ng-zorro.module';
import { SharedModule} from '../Shared/shared.module';
import { BinRequestsComponent } from './bin-requests/bin-requests.component';
import { PickupRequestsComponent } from './pickup-requests/pickup-requests.component';
import { MapModalComponent } from './bin-requests/map-modal/map-modal.component';

@NgModule({
  declarations: [BinRequestsComponent, PickupRequestsComponent, MapModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgZorroModule,
    NgxDatatableModule,
    SharedModule,
  ],
  exports:[
    BinRequestsComponent,
    PickupRequestsComponent,
    MapModalComponent
  ]
})
export class RequestManagementModule { }
