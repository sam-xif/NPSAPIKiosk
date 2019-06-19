import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {WindowRefService} from "./window-ref.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [ WindowRefService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
