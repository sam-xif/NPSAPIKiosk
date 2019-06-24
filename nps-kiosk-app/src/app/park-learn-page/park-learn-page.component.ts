import { Component, OnInit } from '@angular/core';
import {ADataViewComponent} from "../DataViewComponent";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {ObjectStoreService} from "../services/object-store.service";
import {INPSObject, NPSDisplayElementType} from "../../nps/NPSModel";
import {NPSAPIQueryBuilder} from "../../nps/NPSAPIQueryBuilder";
import {NPSDataAccessStrategyBuilder} from "../../nps/NPSDataAccessStrategy";

@Component({
  selector: 'app-park-learn-page',
  templateUrl: './park-learn-page.component.html',
  styleUrls: ['./park-learn-page.component.css']
})
export class ParkLearnPageComponent extends ADataViewComponent {

  public parkCode: string;
  public park: INPSObject;

  public lessonPlans: Array<INPSObject>;
  public lessonPlansCompleted: boolean;

  public people: Array<INPSObject>;
  public peopleCompleted: boolean;

  public places: Array<INPSObject>;
  public placesCompleted: boolean;

  // TODO: Move these enum values into the abstract class so all components have access to them
  private readonly DISPLAY_PROPERTY = NPSDisplayElementType.PROPERTY;
  private readonly DISPLAY_IMAGE = NPSDisplayElementType.IMAGE;

  constructor(
    public route: ActivatedRoute,
    protected router: Router,
    protected apiClient: NPSAPIClientService,
    protected storeService: ObjectStoreService
  ) {
    super(route, router, apiClient, storeService);
    this.lessonPlans = [];
    this.people = [];
    this.places = [];

    this.lessonPlansCompleted = false;
    this.peopleCompleted = false;
    this.placesCompleted = false;
  }

  ngOnInit(): void {
    this.parkCode = this.route.snapshot.paramMap.get('parkCode');
    super.ngOnInit();
  }

  fetchData(): void {
    if (this.receivedObject) {
      this.park = this.receivedObject;
      this.store(this.receivedObject);

      if (!this.parkCode) { // In case the parkCode was not transferred with the object store
        this.parkCode = this.park.applyTransform((sourceData: object) => sourceData['parkCode']);
      }
    } else {
      // Fetch park
      let queryBuilder = new NPSAPIQueryBuilder()
        .addParkCode(this.parkCode)
        .useLongForm(true)
        .setLimit(5)
        .includeField('images')
        .from('parks');

      let strategy = new NPSDataAccessStrategyBuilder()
        .use('default')
        .build();

      let parkSource = this.apiClient.retrieve(queryBuilder.build(), strategy);
      parkSource.addOnCompletedHandler((snapshot: Array<INPSObject>) => {
        if (snapshot.length < 1) {
          this.router.navigateByUrl('/page-not-found');
          return;
        }

        this.park = snapshot[0];
        this.store(this.park);
      });
    }

    // Fetch everything else
    let queryBuilder = new NPSAPIQueryBuilder();
    let query = queryBuilder
      .from('lessonplans')
      .useLongForm(true)
      .setLimit(5)
      .addParkCode(this.parkCode)
      .build();

    let strategyBuilder = new NPSDataAccessStrategyBuilder();
    let strategy = strategyBuilder
      .use('batch', {
        queryBuilder: queryBuilder
      })
      .build();

    let lessonPlansSource = this.apiClient.retrieve(query, strategy);
    lessonPlansSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
      this.lessonPlans = snapshot;
    });
    lessonPlansSource.addOnCompletedHandler((snapshot: Array<INPSObject>) => {
      if (snapshot.length == 0) {
        // TODO Trigger nothing to show alert
      }

      this.lessonPlansCompleted = true;
    });

    queryBuilder = new NPSAPIQueryBuilder();
    query = queryBuilder
      .from('people')
      .useLongForm(true)
      .setLimit(5)
      .addParkCode(this.parkCode)
      .build();
    strategy = strategyBuilder
      .use('batch', {
        queryBuilder: queryBuilder
      })
      .build();

    let peopleSource = this.apiClient.retrieve(query, strategy);
    peopleSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
      this.people = snapshot;
    });
    peopleSource.addOnCompletedHandler((snapshot: Array<INPSObject>) => {
      if (snapshot.length == 0) {
        // TODO Trigger nothing to show alert
      }

      this.peopleCompleted = true;
    });

    queryBuilder = new NPSAPIQueryBuilder();
    query = queryBuilder
      .reset()
      .from('places')
      .useLongForm(true)
      .setLimit(5)
      .addParkCode(this.parkCode)
      .build();
    strategy = strategyBuilder
      .use('batch', {
        queryBuilder: queryBuilder
      })
      .build();

    let placesSource = this.apiClient.retrieve(query, strategy);
    placesSource.addOnUpdateHandler((snapshot: Array<INPSObject>) => {
      this.places = snapshot;
    });
    placesSource.addOnCompletedHandler((snapshot: Array<INPSObject>) => {
      if (snapshot.length == 0) {
        // TODO Trigger nothing to show alert

      }

      this.placesCompleted = true;
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
