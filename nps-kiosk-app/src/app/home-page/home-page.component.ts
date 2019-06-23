import {Component} from '@angular/core';
import {INPSDisplayElement, INPSObject, NPSDisplayElementType} from "../../nps/NPSModel";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import NPSAPIQueryBuilder from "../../nps/NPSAPIQueryBuilder";
import {NPSDataAccessStrategyBuilder} from "../../nps/NPSDataAccessStrategy";
import {ADataViewComponent} from "../DataViewComponent";
import {ObjectStoreService} from "../services/object-store.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent extends ADataViewComponent {
  title: string = 'nps-kiosk-app';
  private images: Array<INPSObject>;
  private activeSet: boolean;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected apiClient: NPSAPIClientService,
    protected storeService: ObjectStoreService
  ) {
    super(route, router, apiClient, storeService);
    this.activeSet = false;
  }

  fetchData(): void {
    let queryBuilder = new NPSAPIQueryBuilder();
    let query = queryBuilder
      .from('parks')
      .includeField('images')
      .build();

    let strategyBuilder = new NPSDataAccessStrategyBuilder();
    let strategy = strategyBuilder
      .use('batch', {
        queryBuilder: queryBuilder,
        numBatches: 5,
        batchSize: 2
      })
      .build();

    let parksSource = this.apiClient.retrieve(query, strategy);
    parksSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
      if (!this.activeSet) {

      }

      let images = [];
      snapshot.forEach((park: INPSObject) => {
        images = images.concat(park.getDisplayElements()
          .filter((disp: INPSDisplayElement) => disp.getDisplayElementType() == NPSDisplayElementType.IMAGE));
      });
      this.images = images;
    });
  }

  onParamMapChange(newParamMap: ParamMap) {
    // Do nothing, as there are no URL parameters we are worried about
  }
}
