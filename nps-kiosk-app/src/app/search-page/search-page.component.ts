import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {Observable, Subscription} from "rxjs";
import NPSAPIQueryBuilder from "../../nps/NPSAPIQueryBuilder";
import {NPSDataAccessStrategyBuilder} from "../../nps/NPSDataAccessStrategy";
import NPSDataSource from "../../nps/NPSDataSource";
import {INPSObject} from "../../nps/NPSModel";
import {ParkStoreService} from "../services/park-store.service";
import {STATE_CODES} from "../../nps/Constants";

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

  // Variables for state filter
  private readonly stateCodes = STATE_CODES;
  private selectedState: string;
  private stateFilters: Array<string>;

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
    this.stateFilters = [];
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
    console.log(this.resource);
    let queryBuilder = new NPSAPIQueryBuilder()
      .from(this.resource)
      .setQueryString(this.query)
      .longText(false);

    let strategyBuilder = new NPSDataAccessStrategyBuilder()
      .use('batch', {
        'queryBuilder': queryBuilder
      });

    if (this.stateFilters.length > 0) {
      strategyBuilder.use('filter', {
        predicate: ((acceptableStateCodes: Array<string>) => {
          return (result: INPSObject) => {
            return result.applyPredicate((obj: object) => {
              if ('states' in obj) {
                let statesStr: string = obj['states'];
                let stateStrSplit: string[] = statesStr.split(',');

                return stateStrSplit.map(
                  (stateCode: string) => acceptableStateCodes.includes(stateCode)
                ).reduce(
                  (acc: boolean, val: boolean) => acc || val, false
                );
              }
            });
          }
        })(this.stateFilters)
      })
    }

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
