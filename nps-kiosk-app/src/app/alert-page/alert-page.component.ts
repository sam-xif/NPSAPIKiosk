import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import NPSAPIQueryBuilder from "../../nps/NPSAPIQueryBuilder";
import {NPSDataAccessStrategyBuilder} from "../../nps/NPSDataAccessStrategy";
import {INPSObject} from "../../nps/NPSModel";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {ObjectStoreService} from "../services/object-store.service";
import {ADataViewComponent} from "../DataViewComponent";

@Component({
  selector: 'app-alert-page',
  templateUrl: './alert-page.component.html',
  styleUrls: ['./alert-page.component.css']
})
export class AlertPageComponent extends ADataViewComponent {
  private parkCode: string;
  private alerts: Array<INPSObject>;

  private noResults: boolean;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected apiClient: NPSAPIClientService,
    protected storeService: ObjectStoreService
  ) {
    super(route, router, apiClient, storeService);
    this.alerts = [];
  }

  ngOnInit() {
    this.parkCode = this.route.snapshot.paramMap.get('parkCode');

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

    super.ngOnInit();
  }

  onParamMapChange(newParamMap: ParamMap) {
    let parkCode = newParamMap.get('parkCode');
    if (parkCode != this.parkCode) {
      this.fetchData();
    }
  }

  fetchData() {
    let queryBuilder = new NPSAPIQueryBuilder()
      .from('alerts')
      .useLongForm(false);

    if (this.parkCode !== undefined) {
      queryBuilder.addParkCode(this.parkCode);
    }

    let strategy = new NPSDataAccessStrategyBuilder()
      .use('default')
      .build();

    let alertsSource = this.apiClient.retrieve(queryBuilder.build(), strategy);
    alertsSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
      this.alerts = snapshot;
    });
    alertsSource.addOnCompletedHandler((snapshot: Array<INPSObject>) => {
      if (snapshot.length == 0) {
        this.noResults = true;
      }
    });
  }
}
