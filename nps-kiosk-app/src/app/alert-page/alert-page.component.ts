import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import NPSAPIQueryBuilder from "../../nps/NPSAPIQueryBuilder";
import {NPSDataAccessStrategyBuilder} from "../../nps/NPSDataAccessStrategy";
import {INPSObject} from "../../nps/NPSModel";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {ParkStoreService} from "../services/park-store.service";
import {query} from "@angular/animations";

@Component({
  selector: 'app-alert-page',
  templateUrl: './alert-page.component.html',
  styleUrls: ['./alert-page.component.css']
})
export class AlertPageComponent implements OnInit, OnDestroy {
  private parkCode: string;
  private park: INPSObject;
  private paramMap$: Observable<ParamMap>;
  private paramMapSubscription: Subscription;
  private alerts: Array<INPSObject>;

  private noResults: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiClient: NPSAPIClientService,
    private parkStore: ParkStoreService
  ) {
    this.alerts = [];
  }

  ngOnInit() {
    this.parkCode = this.route.snapshot.paramMap.get('parkCode');

    if (this.parkStore.hasObject()) {
      this.park = this.parkStore.getObject();
    } else {
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

        this.park = snapshot[0];
      });
    }

    this.paramMap$ = this.route.paramMap;
    this.paramMapSubscription = this.paramMap$.subscribe(
      x => this.onParamMapUpdate(x),
      err => console.error('Error in paramMap observable'),
      () => console.log("Completed")
    );

    this.fetchData();
  }

  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe();
  }

  onParamMapUpdate(newMap: ParamMap) {
    let parkCode = newMap.get('parkCode');
    if (parkCode != this.parkCode) {
      this.fetchData();
    }
  }

  fetchData() {
    let queryBuilder = new NPSAPIQueryBuilder()
      .from('alerts')
      .longText(false);

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
