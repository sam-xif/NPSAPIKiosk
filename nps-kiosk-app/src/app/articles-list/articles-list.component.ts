import { Component, OnInit } from '@angular/core';
import {INPSObject, NPSDisplayElementType} from "../../nps/NPSModel";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {ObjectStoreService} from "../services/object-store.service";
import {StateSelectService} from "../services/state-select.service";
import {NPSAPIQueryBuilder} from "../../nps/NPSAPIQueryBuilder";
import {NPSDataAccessStrategyBuilder} from "../../nps/NPSDataAccessStrategy";
import {ADataViewComponent} from "../DataViewComponent";

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent extends ADataViewComponent {
  public stateCode: string;
  public parkCode: string;
  public articles: Array<INPSObject>;
  public articlesCompleted: boolean;

  public DISPLAY_IMAGE = NPSDisplayElementType.IMAGE;

  constructor(
    public route: ActivatedRoute,
    protected router: Router,
    protected apiClient: NPSAPIClientService,
    protected storeService: ObjectStoreService,
    private stateSelect: StateSelectService
  ) {
    super(route, router, apiClient, storeService);
  }

  ngOnInit(): void {
    this.articles = [];
    this.articlesCompleted = false;
    this.parkCode = this.route.snapshot.paramMap.get('parkCode');
    this.stateCode = this.stateSelect.getState();

    // TODO: This code is largely the same as the campground-list code; another abstraction layer could likely be made
    if (this.parkCode) {
      if (!this.receivedObject) {
        let queryBuilder = new NPSAPIQueryBuilder()
          .addParkCode(this.parkCode)
          .useLongForm(false)
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

          this.receivedObject = snapshot[0];
        });
      } else {
        this.store(this.receivedObject);
      }
    } else {
      this.router.navigateByUrl('/page-not-found');
    }

    super.ngOnInit();
  }

  fetchData(): void {
    let queryBuilder = new NPSAPIQueryBuilder()
      .from('articles')
      .useLongForm(true);
    let query;
    if (this.parkCode) {
      query = queryBuilder
        .addParkCode(this.parkCode)
        .build();
    } else if (this.stateCode) {
      query = queryBuilder
        .addAllStateCodes([this.stateCode])
        .build();
    }

    let strategyBuilder = new NPSDataAccessStrategyBuilder();
    let strategy = strategyBuilder
      .use('batch', {
        queryBuilder: queryBuilder
      })
      .build();

    let articlesSource = this.apiClient.retrieve(query, strategy);
    articlesSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
      console.log(snapshot);
      this.articles = snapshot;
    });
    articlesSource.addOnCompletedHandler((snapshot: Array<INPSObject>) => {
      this.articlesCompleted = true;
    });
  }

  onParamMapChange(newParamMap: ParamMap) {
    let parkCode = newParamMap.get('parkCode');
    if (parkCode != this.parkCode) {
      this.parkCode = parkCode;
      this.fetchData();
    }
  }
}
