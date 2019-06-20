import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {WindowRefService} from "./services/window-ref.service";
import {NPSModelDAOProviderService} from "./services/npsmodel-daoprovider.service";
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
