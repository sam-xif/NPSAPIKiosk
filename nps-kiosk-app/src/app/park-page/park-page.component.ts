import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import NPSAPIQueryBuilder from "../../nps/NPSAPIQueryBuilder";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {NPSDataAccessStrategyBuilder} from "../../nps/NPSDataAccessStrategy";
import NPSDataSource from "../../nps/NPSDataSource";
import {INPSObject, NPSDisplayElementType} from "../../nps/NPSModel";
import {ParkStoreService} from "../services/park-store.service";
import {ADataViewComponent} from "../DataViewComponent";

@Component({
  selector: 'app-park-page',
  templateUrl: './park-page.component.html',
  styleUrls: ['./park-page.component.css']
})
export class ParkPageComponent extends ADataViewComponent {
  private parkCode: string;
  private park: INPSObject;

  // Sub-information about the park
  private parkAlerts: Array<INPSObject>;
  private parkEvents: Array<INPSObject>;

  // NPS Display Element Type bindings for use in the view
  private readonly DISPLAY_IMAGE = NPSDisplayElementType.IMAGE;
  private readonly DISPLAY_SUMMARY = NPSDisplayElementType.SUMMARY;
  private readonly DISPLAY_META = NPSDisplayElementType.META;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected apiClient: NPSAPIClientService,
    private parkStore: ParkStoreService
  ) {
    super(route, router, apiClient);
    this.park = undefined;
    this.parkAlerts = [];
    this.parkEvents = [];
  }

  onParamMapChange(newMap: ParamMap) {
    let parkCode = newMap.get('parkCode');
    if (parkCode != this.parkCode) {
      this.parkCode = parkCode;
      this.fetchData();
    }
  }

  fetchData() {
    let queryBuilder = new NPSAPIQueryBuilder();

    let query = queryBuilder
      .from('parks')
      .includeField('images')
      .addParkCode(this.parkCode)
      .longText(true)
      .build();

    let strategy = new NPSDataAccessStrategyBuilder()
      .use('default')
      .build();

    let parkSource: NPSDataSource = this.apiClient.retrieve(query, strategy);
    parkSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
      if (snapshot.length < 1) {
        //this.router.navigateByUrl('/page-not-found');
      }

      this.park = snapshot[0];
      this.parkStore.setObject(this.park);
    });

    query = queryBuilder
      .reset()
      .from('alerts')
      .addParkCode(this.parkCode)
      .longText(false)
      .setLimit(5)
      .build();

    let alertsSource: NPSDataSource = this.apiClient.retrieve(query, strategy);
    alertsSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
      this.parkAlerts = snapshot;
    });

    query = queryBuilder
      .reset()
      .from('events')
      .addParkCode(this.parkCode)
      .longText(false)
      .setLimit(5)
      .build();

    console.log(query);

    let eventsSource: NPSDataSource = this.apiClient.retrieve(query, strategy);
    eventsSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
      console.log(snapshot);
      this.parkEvents = snapshot;
    })
  }
}
