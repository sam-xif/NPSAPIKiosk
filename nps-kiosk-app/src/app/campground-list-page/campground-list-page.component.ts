import { Component, OnInit } from '@angular/core';
import {ADataViewComponent} from "../DataViewComponent";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {ObjectStoreService} from "../services/object-store.service";
import NPSAPIQueryBuilder from "../../nps/NPSAPIQueryBuilder";
import {NPSDataAccessStrategyBuilder} from "../../nps/NPSDataAccessStrategy";
import {INPSObject} from "../../nps/NPSModel";

@Component({
  selector: 'app-campground-list-page',
  templateUrl: './campground-list-page.component.html',
  styleUrls: ['./campground-list-page.component.css']
})
export class CampgroundListPageComponent extends ADataViewComponent {
  private parkCode: string;
  private campgrounds: Array<INPSObject>;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected apiClient: NPSAPIClientService,
    protected storeService: ObjectStoreService
  ) {
    super(route, router, apiClient, storeService);
  }

  ngOnInit(): void {
    this.parkCode = this.route.snapshot.paramMap.get('parkCode');

    if (!this.receivedObject) {
      let queryBuilder = new NPSAPIQueryBuilder()
        .addParkCode(this.parkCode)
        .longText(false)
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

    super.ngOnInit();
  }

  fetchData(): void {
    let queryBuilder = new NPSAPIQueryBuilder();
    let query = queryBuilder
      .from('campgrounds')
      .addParkCode(this.parkCode)
      .longText(true)
      .build();

    let strategyBuilder = new NPSDataAccessStrategyBuilder();
    let strategy = strategyBuilder
      .use('default')
      .build();

    let campgroundsSource = this.apiClient.retrieve(query, strategy);
    campgroundsSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
      this.campgrounds = snapshot;
    });
    campgroundsSource.addOnCompletedHandler((snapshot: Array<INPSObject>) => {
      if (snapshot.length == 0) {
        this.router.navigateByUrl('/page-not-found');
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
