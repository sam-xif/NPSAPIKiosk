import {OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NPSAPIClientService} from "./services/npsapiclient.service";
import {Observable, Subscription} from "rxjs";
import {ObjectStoreService} from "./services/object-store.service";
import {INPSObject} from "../nps/NPSModel";

/**
 *
 */
export interface IDataViewComponent extends OnInit, OnDestroy {
  fetchData(): void;
  onParamMapChange(newParamMap: ParamMap);

  store(obj: INPSObject);
}


// TODO: Abstract more boolean flags and control flow into this class
//  (such as the `waiting` flag for when a request is being processed)
export abstract class ADataViewComponent implements IDataViewComponent {
  protected paramMap$: Observable<ParamMap>;
  protected paramMapSubscription: Subscription;
  protected receivedObject: INPSObject;

  protected constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected apiClient: NPSAPIClientService,
    protected storeService: ObjectStoreService
  ) {}

  abstract fetchData(): void;

  ngOnInit(): void {
    this.receivedObject = this.storeService.getObject(); // Will be set to undefined if none exists, which is intended
    this.storeService.clearObject();

    this.paramMap$ = this.route.paramMap;
    this.paramMapSubscription = this.paramMap$.subscribe(
      x => this.onParamMapChange(x),
      err => console.error("error in paramMap observable"),
      () => console.log("paramMap observable completed")
    );
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe();
  }

  abstract onParamMapChange(newParamMap: ParamMap);

  store(obj: INPSObject) {
    this.storeService.setObject(obj);
  }
}

