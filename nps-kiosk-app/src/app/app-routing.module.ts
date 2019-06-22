import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ParkPageComponent} from "./park-page/park-page.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {SearchPageComponent} from "./search-page/search-page.component";

const routes: Routes = [
  { path: 'parks/:parkCode', component: ParkPageComponent, pathMatch: 'full'},
  { path: 'search', component: SearchPageComponent },
  { path: 'search/:resource', component: SearchPageComponent },
  { path: 'search/:resource/:query', component: SearchPageComponent },
  { path: '', component: HomePageComponent },
  { path: '**', component: PageNotFoundComponent }
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
