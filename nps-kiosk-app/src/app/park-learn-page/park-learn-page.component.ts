import { Component, OnInit } from '@angular/core';
import {ADataViewComponent} from "../DataViewComponent";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {ObjectStoreService} from "../services/object-store.service";

@Component({
  selector: 'app-park-learn-page',
  templateUrl: './park-learn-page.component.html',
  styleUrls: ['./park-learn-page.component.css']
})
export class ParkLearnPageComponent extends ADataViewComponent {

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected apiClient: NPSAPIClientService,
    protected storeService: ObjectStoreService
  ) {
    super(route, router, apiClient, storeService);
  }

  fetchData(): void {
  }

  onParamMapChange(newParamMap: ParamMap) {
  }
}
