import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {WindowRefService} from "./services/window-ref.service";
import {NPSModelDAOProviderService} from "./services/npsmodel-daoprovider.service";
import {FormsModule} from "@angular/forms";
import { ParkPageComponent } from './park-page/park-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { AlertPageComponent } from './alert-page/alert-page.component';
import {ObjectStoreService} from "./services/object-store.service";
import {CommonModule} from "@angular/common";
import {EscapeHtmlPipe} from "./pipes/keep-html.pipe";
import { EventPageComponent } from './event-page/event-page.component';


@NgModule({
  declarations: [
    ParkPageComponent,
    HomePageComponent,
    AppComponent,
    PageNotFoundComponent,
    SearchPageComponent,
    AlertPageComponent,
    EscapeHtmlPipe,
    EventPageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ WindowRefService, NPSModelDAOProviderService, ObjectStoreService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
