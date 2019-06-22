import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import NPSAPIQueryBuilder from "../../nps/NPSAPIQueryBuilder";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {NPSDataAccessStrategyBuilder} from "../../nps/NPSDataAccessStrategy";
import NPSDataSource from "../../nps/NPSDataSource";
import {INPSObject, NPSDisplayElementType} from "../../nps/NPSModel";

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

  // NPS Display Element Type bindings for use in the view
  private readonly DISPLAY_IMAGE = NPSDisplayElementType.IMAGE;
  private readonly DISPLAY_PARAGRAPH = NPSDisplayElementType.PARAGRAPH;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiClient: NPSAPIClientService) {
    this.park = undefined;
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

    let dataSource: NPSDataSource = this.apiClient.retrieve(query, strategy);
    dataSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
      if (snapshot.length < 1) {
        throw new Error("Need at least one park response");
      }

      this.park = snapshot[0];
    });
  }
}
