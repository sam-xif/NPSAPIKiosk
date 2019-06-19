import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {WindowRefService} from "./window-ref.service";
import {NPSModelDAOProviderService} from "./npsmodel-daoprovider.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [ WindowRefService, NPSModelDAOProviderService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
