import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {WindowRefService} from "./window-ref.service";
import {NPSModelDAOProviderService} from "./npsmodel-daoprovider.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [ WindowRefService, NPSModelDAOProviderService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
