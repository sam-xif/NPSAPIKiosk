import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {NPSAPIQueryBuilder} from "../../nps/NPSAPIQueryBuilder";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {NPSDataAccessStrategyBuilder} from "../../nps/NPSDataAccessStrategy";
import {NPSDataSource} from "../../nps/NPSDataSource";
import {INPSObject, NPSDisplayElementType} from "../../nps/NPSModel";
import {ObjectStoreService} from "../services/object-store.service";
import {ADataViewComponent} from "../DataViewComponent";

@Component({
  selector: 'app-park-page',
  templateUrl: './park-page.component.html',
  styleUrls: ['./park-page.component.css']
})
export class ParkPageComponent extends ADataViewComponent {
  public parkCode: string;
  public park: INPSObject;

  // Sub-information about the park
  public parkAlerts: Array<INPSObject>;
  public parkEvents: Array<INPSObject>;
  public parkArticles: Array<INPSObject>;
  public parkNewsReleases: Array<INPSObject>;

  // NPS Display Element Type bindings for use in the view
  private readonly DISPLAY_IMAGE = NPSDisplayElementType.IMAGE;
  private readonly DISPLAY_SUMMARY = NPSDisplayElementType.SUMMARY;
  private readonly DISPLAY_META = NPSDisplayElementType.META;

  constructor(
    public route: ActivatedRoute,
    protected router: Router,
    protected apiClient: NPSAPIClientService,
    protected storeService: ObjectStoreService
  ) {
    super(route, router, apiClient, storeService);
    this.park = undefined;
    this.parkAlerts = [];
    this.parkEvents = [];
    this.parkArticles = [];
    this.parkNewsReleases = [];
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
    let strategy = new NPSDataAccessStrategyBuilder()
      .use('default')
      .build();

    if (!this.receivedObject) {
      let query = queryBuilder
        .from('parks')
        .includeField('images')
        .addParkCode(this.parkCode)
        .useLongForm(true)
        .build();

      let parkSource: NPSDataSource = this.apiClient.retrieve(query, strategy);
      parkSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
        if (snapshot.length < 1) {
          //this.router.navigateByUrl('/page-not-found');
        }

        this.park = snapshot[0];
        this.store(this.park);
      });

    } else {
      this.park = this.receivedObject;
    }

    let query = queryBuilder
      .reset()
      .from('alerts')
      .addParkCode(this.parkCode)
      .useLongForm(false)
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
      .useLongForm(true)
      .set('pagesize', 5)
      .includeField('images')
      .build();

    let eventsSource: NPSDataSource = this.apiClient.retrieve(query, strategy);
    eventsSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
      this.parkEvents = snapshot;
    });

    query = queryBuilder
      .reset()
      .from('articles')
      .addParkCode(this.parkCode)
      .useLongForm(true)
      .includeField('images')
      .setLimit(5)
      .build();

    let articlesSource: NPSDataSource = this.apiClient.retrieve(query, strategy);
    articlesSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
      this.parkArticles = snapshot;
    });

    query = queryBuilder
      .reset()
      .from('newsreleases')
      .addParkCode(this.parkCode)
      .useLongForm(true)
      .includeField('images')
      .setLimit(5)
      .build();

    let newsReleasesSource: NPSDataSource = this.apiClient.retrieve(query, strategy);
    newsReleasesSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
      console.log("Articles");
      this.parkNewsReleases = snapshot;
    });
  }
}
