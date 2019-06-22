import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {Observable, Subscription} from "rxjs";
import NPSAPIQueryBuilder from "../../nps/NPSAPIQueryBuilder";
import {NPSDataAccessStrategyBuilder} from "../../nps/NPSDataAccessStrategy";
import NPSDataSource from "../../nps/NPSDataSource";
import {INPSObject} from "../../nps/NPSModel";

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiClient: NPSAPIClientService
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
    if (!this.waiting) {
      this.fetchData();
    }
  }

  fetchData() {
    this.waiting = true;
    this.noResults = false;
    this.data = [];

    let query = new NPSAPIQueryBuilder()
      .from(this.resource)
      .setQueryString(this.query)
      .longText(false)
      .build();

    let strategy = new NPSDataAccessStrategyBuilder()
      .use('default')
      .build();

    let dataSource: NPSDataSource = this.apiClient.retrieve(query, strategy);
    dataSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
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
