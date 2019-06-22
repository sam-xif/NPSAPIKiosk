import {OnDestroy, OnInit} from "@angular/core";

/**
 *
 */
export default interface IDataViewComponent extends OnInit, OnDestroy {
  /**
   *
   */
  fetchData(): void;
}
