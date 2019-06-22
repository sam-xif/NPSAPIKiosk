import {OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NPSAPIClientService} from "./services/npsapiclient.service";
import {Observable, Subscription} from "rxjs";

/**
 *
 */
export interface IDataViewComponent extends OnInit, OnDestroy {
  fetchData(): void;
  onParamMapChange(newParamMap: ParamMap);
}

export abstract class ADataViewComponent implements IDataViewComponent {
  protected paramMap$: Observable<ParamMap>;
  protected paramMapSubscription: Subscription;

  protected constructor(
    private route: ActivatedRoute,
  ) { }

  abstract fetchData(): void;

  ngOnInit(): void {
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
}

