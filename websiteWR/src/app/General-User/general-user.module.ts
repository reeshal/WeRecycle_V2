import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroModule } from '../ng-zorro.module';
import { SharedModule } from '../Shared/shared.module';
import { AllPricesComponent } from './all-prices/all-prices.component';
import { RegionCardComponent } from './all-prices/region-card/region-card.component';
import { AllBinsComponent } from './all-bins/all-bins.component';
import { DescriptionComponent } from './all-bins/description/description.component';
import { GeneralUserRoutingModule } from './general-user-routing.module';

@NgModule({
  declarations: [
    AllPricesComponent,
    RegionCardComponent,
    AllBinsComponent,
    DescriptionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgZorroModule,
    SharedModule,
    GeneralUserRoutingModule,
  ],
})
export class GeneralUserModule {}
