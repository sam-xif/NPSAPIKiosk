import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {Observable, Subscription} from "rxjs";
import NPSAPIQueryBuilder from "../../nps/NPSAPIQueryBuilder";
import {NPSDataAccessStrategyBuilder} from "../../nps/NPSDataAccessStrategy";
import NPSDataSource from "../../nps/NPSDataSource";
import {INPSObject} from "../../nps/NPSModel";
import {ParkStoreService} from "../services/park-store.service";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit, OnDestroy {
  private paramMap$: Observable<ParamMap>;
  private paramMapSubscription: Subscription;

  private resource: string;
  private query: string;

  private data: Array<INPSObject>;
  private waiting: boolean;
  private noResults: boolean;
  private datumRouterLink: any;
  private datumRouterLinkGenerator =
    (resource: string) => {
      return (datum: INPSObject) => {
        return ['/', resource, datum.getUniqueId()];
      }
    };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiClient: NPSAPIClientService,
    private parkStore: ParkStoreService
  ) {
    // Defaults
    this.resource = 'alerts';
    this.query = undefined;
    this.waiting = false;
    this.noResults = false;
  }

  ngOnInit() {
    this.paramMap$ = this.route.paramMap;
    this.paramMapSubscription = this.paramMap$.subscribe(
      x => this.onParamMapChange(x),
      err => console.error("error in paramMap observable"),
      () => console.log("paramMap observable completed")
    );
    this.fetchData();
    console.log("Search component initialized");
  }

  ngOnDestroy() {
    this.paramMapSubscription.unsubscribe();
    console.log("Search component destroyed");
  }

  onParamMapChange(newMap: ParamMap) {
    let query = newMap.get('query');
    let resource = newMap.get('resource');

    console.log("PARAMS UPDATED", query, resource);

    if (!this.waiting) {
      this.query = query;
      this.resource = resource;
      this.fetchData();
    }
  }

  onSubmit() {
    this.router.navigate([
      '/search',
      this.resource,
      this.query
    ]);
    /*
    if (!this.waiting) {
      this.fetchData();
    }*/
  }

  fetchData() {
    this.waiting = true;
    this.noResults = false;
    this.data = [];

    this.datumRouterLink = this.datumRouterLinkGenerator(this.resource);
    this.parkStore.setObject(undefined);

    let queryBuilder = new NPSAPIQueryBuilder()
      .from(this.resource)
      .setQueryString(this.query)
      .longText(false);

    let strategy = new NPSDataAccessStrategyBuilder()
      .use('batch', {
        'queryBuilder': queryBuilder
      })
      .build();

    let dataSource: NPSDataSource = this.apiClient.retrieve(queryBuilder.build(), strategy);
    dataSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
      if (snapshot.length > 0) {
        this.waiting = false;
      }

      this.data = snapshot;
    });
    dataSource.addOnCompletedHandler((snapshot: Array<INPSObject>) => {
      if (snapshot.length == 0) {
        this.noResults = true;
      }

      this.waiting = false;
    });
  }

}
