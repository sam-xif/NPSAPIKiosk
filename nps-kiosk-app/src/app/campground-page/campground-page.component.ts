import { Component, OnInit } from '@angular/core';
import {ADataViewComponent} from "../DataViewComponent";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {ObjectStoreService} from "../services/object-store.service";
import {INPSObject, NPSDisplayElementType} from "../../nps/NPSModel";

@Component({
  selector: 'app-campground-page',
  templateUrl: './campground-page.component.html',
  styleUrls: ['./campground-page.component.css']
})
export class CampgroundPageComponent extends ADataViewComponent {
  private readonly DISPLAY_PARAGRAPH = NPSDisplayElementType.SUMMARY;

  constructor(
    public route: ActivatedRoute,
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
