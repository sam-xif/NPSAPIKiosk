import { Component} from '@angular/core';
import {ADataViewComponent} from "../DataViewComponent";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {NPSDisplayElementType} from "../../nps/NPSModel";
import {ObjectStoreService} from "../services/object-store.service";

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent extends ADataViewComponent {
  public parkCode: string;

  private readonly DISPLAY_PROPERTY = NPSDisplayElementType.PROPERTY;
  private readonly DISPLAY_PARAGRAPH = NPSDisplayElementType.SUMMARY;
  private readonly DISPLAY_IMAGE = NPSDisplayElementType.IMAGE;

  constructor(
    public route: ActivatedRoute,
    protected router: Router,
    protected apiClient: NPSAPIClientService,
    protected storeService: ObjectStoreService
  ) {
    super(route, router, apiClient, storeService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    if (this.receivedObject === undefined) {
      this.router.navigateByUrl('/page-not-found');
    }
  }

  fetchData(): void {

  }

  onParamMapChange(newParamMap: ParamMap) {
    let parkCode = newParamMap.get('parkCode');
    if (parkCode !== this.parkCode) {
      this.parkCode = parkCode;
      this.fetchData();
    }
  }
}
