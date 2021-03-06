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
import { CampgroundPageComponent } from './campground-page/campground-page.component';
import { CampgroundListPageComponent } from './campground-list-page/campground-list-page.component';
import { ParkLearnPageComponent } from './park-learn-page/park-learn-page.component';
import {StateSelectService} from "./services/state-select.service";
import {CallbackPipe} from "./pipes/callback.pipe";
import { VisitorCenterListComponent } from './visitor-center-list/visitor-center-list.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { NewsReleasesListComponent } from './newsreleases-list/news-releases-list.component';


@NgModule({
  declarations: [
    ParkPageComponent,
    HomePageComponent,
    AppComponent,
    PageNotFoundComponent,
    SearchPageComponent,
    AlertPageComponent,
    EscapeHtmlPipe,
    CallbackPipe,
    EventPageComponent,
    CampgroundPageComponent,
    CampgroundListPageComponent,
    ParkLearnPageComponent,
    VisitorCenterListComponent,
    ArticlesListComponent,
    NewsReleasesListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ WindowRefService, NPSModelDAOProviderService, ObjectStoreService, StateSelectService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
