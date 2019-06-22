import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import NPSAPIQueryBuilder from "../../nps/NPSAPIQueryBuilder";
import {NPSDataAccessStrategyBuilder} from "../../nps/NPSDataAccessStrategy";
import {INPSObject} from "../../nps/NPSModel";
import {NPSAPIClientService} from "../services/npsapiclient.service";

@Component({
  selector: 'app-alert-page',
  templateUrl: './alert-page.component.html',
  styleUrls: ['./alert-page.component.css']
})
export class AlertPageComponent implements OnInit, OnDestroy {
  private parkCode: string;
  private paramMap$: Observable<ParamMap>;
  private paramMapSubscription: Subscription;
  private alerts: Array<INPSObject>;

  private noResults: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiClient: NPSAPIClientService
  ) {
    this.alerts = [];
  }

  ngOnInit() {
    this.parkCode = this.route.snapshot.paramMap.get('parkCode');
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
