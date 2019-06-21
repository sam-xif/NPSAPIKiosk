import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ParkPageComponent} from "./park-page/park-page.component";
import {HomePageComponent} from "./home-page/home-page.component";

const routes: Routes = [
  { path: 'park/:parkCode', component: ParkPageComponent, pathMatch: 'full'},
  { path: '', component: HomePageComponent }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
