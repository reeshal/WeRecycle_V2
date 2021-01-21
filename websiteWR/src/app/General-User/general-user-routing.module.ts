import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AllPricesComponent } from './all-prices/all-prices.component'
import { AllBinsComponent } from './all-bins/all-bins.component';

const routes:Routes = [
  {
    path:'Prices',
    component:AllPricesComponent
  },
  {
    path:'Bins',
    component: AllBinsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class GeneralUserRoutingModule { }
