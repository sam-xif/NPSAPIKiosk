import { Component, OnInit } from '@angular/core';
import {ADataViewComponent} from "../DataViewComponent";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {ObjectStoreService} from "../services/object-store.service";
import {NPSAPIQueryBuilder} from "../../nps/NPSAPIQueryBuilder";
import {NPSDataAccessStrategyBuilder} from "../../nps/NPSDataAccessStrategy";
import {INPSObject} from "../../nps/NPSModel";
import {StateSelectService} from "../services/state-select.service";

@Component({
  selector: 'app-campground-list-page',
  templateUrl: './campground-list-page.component.html',
  styleUrls: ['./campground-list-page.component.css']
})
export class CampgroundListPageComponent extends ADataViewComponent {
  public parkCode: string;
  public campgrounds: Array<INPSObject>;
  public stateCode: string;
  public waiting: boolean;
  public noResults: boolean;

  constructor(
    public route: ActivatedRoute,
    protected router: Router,
    protected apiClient: NPSAPIClientService,
    protected storeService: ObjectStoreService,
    protected stateSelect: StateSelectService
  ) {
    super(route, router, apiClient, storeService);
  }

  ngOnInit(): void {
    this.waiting = false;
    this.noResults = false;
    this.campgrounds = [];
    this.parkCode = this.route.snapshot.paramMap.get('parkCode');
    this.stateCode = this.stateSelect.getState();

    if (this.parkCode) {
      if (!this.receivedObject) {
        let queryBuilder = new NPSAPIQueryBuilder()
          .addParkCode(this.parkCode)
          .useLongForm(false)
          .setLimit(5)
          .from('parks');

        let strategy = new NPSDataAccessStrategyBuilder()
          .use('batch', {
            queryBuilder: queryBuilder
          })
          .build();

        let parkSource = this.apiClient.retrieve(queryBuilder.build(), strategy);
        parkSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
          if (snapshot.length < 1) {
            this.router.navigateByUrl('/page-not-found');
            return;
          }

          this.receivedObject = snapshot[0];
        });
      } else {
        this.store(this.receivedObject);
      }
    } else if (!this.stateCode) {
      console.log(this.route.parent);
      alert("To view campgrounds, you must select a state or park");
      this.router.navigate(['.'], {
        relativeTo: this.route.parent
      });
    }

    super.ngOnInit();
  }

  fetchData(): void {
    this.waiting = true;
    let queryBuilder = new NPSAPIQueryBuilder()
      .from('campgrounds')
      .useLongForm(true);
    let query;
    if (this.parkCode) {
      query = queryBuilder
        .addParkCode(this.parkCode)
        .build();
    } else if (this.stateCode) {
      query = queryBuilder
        .addAllStateCodes([this.stateCode])
        .build();
    }

    let strategyBuilder = new NPSDataAccessStrategyBuilder();
    let strategy = strategyBuilder
      .use('batch', {
        queryBuilder: queryBuilder
      })
      .build();

    let campgroundsSource = this.apiClient.retrieve(query, strategy);
    campgroundsSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
      if (snapshot.length > 0) {
        this.waiting = false;
      }
      this.campgrounds = snapshot;
    });
    campgroundsSource.addOnCompletedHandler((snapshot: Array<INPSObject>) => {
      if (snapshot.length == 0) {
        this.waiting = false;
        this.noResults = true;
      }
    });
  }

  onParamMapChange(newParamMap: ParamMap) {
    let parkCode = newParamMap.get('parkCode');
    if (parkCode != this.parkCode) {
      this.parkCode = parkCode;
      this.fetchData();
    }
  }
}
