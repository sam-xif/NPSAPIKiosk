import {Component} from '@angular/core';
import {INPSDisplayElement, INPSObject, NPSDisplayElementType} from "../../nps/NPSModel";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NPSAPIQueryBuilder} from "../../nps/NPSAPIQueryBuilder";
import {NPSDataAccessStrategyBuilder} from "../../nps/NPSDataAccessStrategy";
import {ADataViewComponent} from "../DataViewComponent";
import {ObjectStoreService} from "../services/object-store.service";
import {STATE_CODES} from "../../nps/Constants";
import {StateSelectService} from "../services/state-select.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent extends ADataViewComponent {
  title: string = 'nps-kiosk-app';
  public images: Array<INPSObject>;
  public selectedState: string = undefined;
  public stateCodes = STATE_CODES;

  constructor(
    public route: ActivatedRoute,
    protected router: Router,
    protected apiClient: NPSAPIClientService,
    protected storeService: ObjectStoreService,
    public stateSelect: StateSelectService
  ) {
    super(route, router, apiClient, storeService);
  }

  ngOnInit(): void {
    if (this.stateSelect.hasState()) {
      this.selectedState = this.stateSelect.getState();
    }
    this.storeService.clear(); // Make sure stack is clear after returning to home
    super.ngOnInit();
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
