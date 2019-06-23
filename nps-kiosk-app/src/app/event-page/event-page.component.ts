import { Component, OnInit } from '@angular/core';
import {ADataViewComponent} from "../DataViewComponent";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import NPSAPIQueryBuilder from "../../nps/NPSAPIQueryBuilder";
import {NPSDataAccessStrategyBuilder} from "../../nps/NPSDataAccessStrategy";
import {INPSObject, NPSDisplayElementType} from "../../nps/NPSModel";

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent extends ADataViewComponent {
  private parkCode: string;
  private events: Array<INPSObject>;

  private readonly DISPLAY_PROPERTY = NPSDisplayElementType.PROPERTY;
  private readonly DISPLAY_PARAGRAPH = NPSDisplayElementType.SUMMARY;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected apiClient: NPSAPIClientService
  ) {
    super(route, router, apiClient);
  }

  fetchData(): void {
    let queryBuilder = new NPSAPIQueryBuilder();

    let query = queryBuilder
      .from('events')
      .addParkCode(this.parkCode)
      .longText(true)
      .build();

    let strategyBuilder = new NPSDataAccessStrategyBuilder();
    let strategy = strategyBuilder
      .use('batch', {
        queryBuilder: queryBuilder,
        batchSize: 15
      })
      .build();

    let eventsSource = this.apiClient.retrieve(query, strategy);
    eventsSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
      if (snapshot.length < 1) {
        this.router.navigateByUrl('/page-not-found');
        return;
      }

      this.events = snapshot;
    });
  }

  onParamMapChange(newParamMap: ParamMap) {
    let parkCode = newParamMap.get('parkCode');
    if (parkCode !== this.parkCode) {
      this.parkCode = parkCode;
      this.fetchData();
    }
  }
}
