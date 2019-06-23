import {Component} from '@angular/core';
import {ADataViewComponent} from "../DataViewComponent";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {ObjectStoreService} from "../services/object-store.service";
import {INPSDisplayElement, NPSDisplayElementType} from "../../nps/NPSModel";

@Component({
  selector: 'app-campground-page',
  templateUrl: './campground-page.component.html',
  styleUrls: ['./campground-page.component.css']
})
export class CampgroundPageComponent extends ADataViewComponent {
  private readonly DISPLAY_PARAGRAPH = NPSDisplayElementType.SUMMARY;
  private readonly DISPLAY_PROPERTY = NPSDisplayElementType.PROPERTY;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected apiClient: NPSAPIClientService,
    protected storeService: ObjectStoreService
  ) {
    super(route, router, apiClient, storeService);
  }

  selectParagraphs(obj: INPSDisplayElement) {
    return obj.getDisplayElementType() === NPSDisplayElementType.SUMMARY;
  }

  selectProperties(obj: INPSDisplayElement) {
    return obj.getDisplayElementType() === NPSDisplayElementType.PROPERTY;
  }

  fetchData(): void {
    if (!this.receivedObject) {
      this.router.navigateByUrl('/page-not-found');
    }
  }

  onParamMapChange(newParamMap: ParamMap) {
  }
}
