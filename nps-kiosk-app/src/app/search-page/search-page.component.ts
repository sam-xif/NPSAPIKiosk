import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {Observable, Subscription} from "rxjs";
import NPSAPIQueryBuilder from "../../nps/NPSAPIQueryBuilder";
import {NPSDataAccessStrategyBuilder} from "../../nps/NPSDataAccessStrategy";
import NPSDataSource from "../../nps/NPSDataSource";
import {INPSObject} from "../../nps/NPSModel";
import {ObjectStoreService} from "../services/object-store.service";
import {STATE_CODES} from "../../nps/Constants";
import {ADataViewComponent} from "../DataViewComponent";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent extends ADataViewComponent {
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

  // Variables for state filter
  private readonly stateCodes = STATE_CODES;
  private selectedState: string;
  private stateFilters: Array<string>;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected apiClient: NPSAPIClientService,
    private parkStore: ObjectStoreService
  ) {
    super(route, router, apiClient);
    // Defaults
    this.resource = 'alerts';
    this.query = undefined;
    this.waiting = false;
    this.noResults = false;
    this.stateFilters = [];
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
      .longText(false)
      .addAllStateCodes(this.stateFilters);

    let strategyBuilder = new NPSDataAccessStrategyBuilder()
      .use('batch', {
        'queryBuilder': queryBuilder
      });

    let dataSource: NPSDataSource = this.apiClient.retrieve(queryBuilder.build(), strategyBuilder.build());
    dataSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
      if (snapshot.length > 0) {
        this.waiting = false;
      }
      this.data = snapshot;
    });
    dataSource.addOnCompletedHandler((snapshot: Array<INPSObject>) => {
      this.noResults = snapshot.length == 0;
      this.waiting = false;
    });
  }

  addStateFilter(stateCode: string) {
    this.stateFilters.push(stateCode);
    this.fetchData();
    console.log("Attempt to add state", stateCode);
  }

  removeStateFilter(stateCode: string) {
    this.stateFilters = this.stateFilters.reduce((acc, val) => {
      if (val !== stateCode) {
        acc.push(val);
      }
      return acc;
    }, []);
    this.fetchData();
    console.log("Attempt to remove state", stateCode);
  }
}
