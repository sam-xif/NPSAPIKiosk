import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ParkPageComponent} from "./park-page/park-page.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {SearchPageComponent} from "./search-page/search-page.component";
import {AlertPageComponent} from "./alert-page/alert-page.component";
import {EventPageComponent} from "./event-page/event-page.component";
import {CampgroundPageComponent} from "./campground-page/campground-page.component";
import {CampgroundListPageComponent} from "./campground-list-page/campground-list-page.component";
import {ParkLearnPageComponent} from "./park-learn-page/park-learn-page.component";
import {VisitorCenterListComponent} from "./visitor-center-list/visitor-center-list.component";
import {ArticlesListComponent} from "./articles-list/articles-list.component";
import {NewsReleasesListComponent} from "./newsreleases-list/news-releases-list.component";

const routes: Routes = [
  { path: 'parks/:parkCode', component: ParkPageComponent, pathMatch: 'full' },

  { path: 'learn/:parkCode', component: ParkLearnPageComponent, pathMatch: 'full' },

  { path: 'campground', component: CampgroundPageComponent },
  { path: 'campgrounds', component: CampgroundListPageComponent, pathMatch: 'full' },
  { path: 'campgrounds/:parkCode', component: CampgroundListPageComponent, pathMatch: 'full' },

  { path: 'visitorcenters', component: VisitorCenterListComponent, pathMatch: 'full' },
  { path: 'visitorcenters/:parkCode', component: VisitorCenterListComponent, pathMatch: 'full' },

  { path: 'articles/:parkCode', component: ArticlesListComponent, pathMatch: 'full' },

  { path: 'newsreleases/:parkCode', component: NewsReleasesListComponent, pathMatch: 'full' },

  { path: 'event', component: EventPageComponent, pathMatch: 'full' },

  { path: 'alerts', component: AlertPageComponent },
  { path: 'alerts/:parkCode', component: AlertPageComponent },

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
