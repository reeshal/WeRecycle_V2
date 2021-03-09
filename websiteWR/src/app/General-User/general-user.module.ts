import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroModule } from '../ng-zorro.module';
import { SharedModule } from '../Shared/shared.module';
import { AllPricesComponent } from './all-prices/all-prices.component';
import { RegionCardComponent } from './all-prices/region-card/region-card.component';
import { GeneralUserRoutingModule } from './general-user-routing.module';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [AllPricesComponent, RegionCardComponent, HomepageComponent],
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
