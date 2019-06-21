import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {WindowRefService} from "./services/window-ref.service";
import {NPSModelDAOProviderService} from "./services/npsmodel-daoprovider.service";
import {FormsModule} from "@angular/forms";
import { ParkPageComponent } from './park-page/park-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    ParkPageComponent,
    HomePageComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ WindowRefService, NPSModelDAOProviderService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
