import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import NPSAPIQueryBuilder from "../../nps/NPSAPIQueryBuilder";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {NPSDataAccessStrategyBuilder} from "../../nps/NPSDataAccessStrategy";
import NPSDataSource from "../../nps/NPSDataSource";
import {INPSObject, NPSDisplayElementType} from "../../nps/NPSModel";
import {ParkStoreService} from "../services/park-store.service";

@Component({
  selector: 'app-park-page',
  templateUrl: './park-page.component.html',
  styleUrls: ['./park-page.component.css']
})
export class ParkPageComponent implements OnInit, OnDestroy {
  private paramMap$: Observable<ParamMap>;
  private paramMapSubscription: Subscription;
  private parkCode: string;
  private park: INPSObject;
  private parkAlerts: Array<INPSObject>;

  // NPS Display Element Type bindings for use in the view
  private readonly DISPLAY_IMAGE = NPSDisplayElementType.IMAGE;
  private readonly DISPLAY_SUMMARY = NPSDisplayElementType.SUMMARY;
  private readonly DISPLAY_META = NPSDisplayElementType.META;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiClient: NPSAPIClientService,
    private parkStore: ParkStoreService
  ) {
    this.park = undefined;
    this.parkAlerts = [];
  }

  ngOnInit() {
    // Set initial value with snapshot
    this.parkCode = this.route.snapshot.paramMap.get('parkCode');
    this.paramMap$ = this.route.paramMap;
    this.paramMapSubscription =  this.paramMap$.subscribe(
      x => this.onParamMapChange(x),
      err => console.error("parkCode observer encountered error: " + err),
      () => console.log("Complete notification")
    );
    this.fetchData();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all observables
    this.paramMapSubscription.unsubscribe();
  }

  onParamMapChange(newMap: ParamMap) {
    let parkCode = newMap.get('parkCode');
    if (parkCode != this.parkCode) {
      this.fetchData();
    }
  }

  fetchData() {
    let query = new NPSAPIQueryBuilder()
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
        this.router.navigateByUrl('/page-not-found');
      }

      this.park = snapshot[0];
      this.parkStore.setObject(this.park);
    });

    query = new NPSAPIQueryBuilder()
      .from('alerts')
      .addParkCode(this.parkCode)
      .longText(false)
      .setLimit(5)
      .build();

    let alertsSource: NPSDataSource = this.apiClient.retrieve(query, strategy);
    alertsSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
      this.parkAlerts = snapshot;
    });
  }
}
