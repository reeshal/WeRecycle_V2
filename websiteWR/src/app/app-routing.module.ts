import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path:'General',
    loadChildren: ()=> import('./General-User/general-user-routing.module').then(m=>m.GeneralUserRoutingModule)
  },
  {
    path:'Admin',
    loadChildren: ()=> import('./Admin/admin-routing.module').then(m=>m.AdminRoutingModule)
  },
  {
    path:'Driver',
    loadChildren: ()=> import('./Drivers/drivers-routing.module').then(m=>m.DriversRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
