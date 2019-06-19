import { Injectable } from '@angular/core';
import { NPSAPIWorkerManager } from './clientWorkerManager';
import { NPSAPIQuery } from './client';
import { NPSModel } from './model';
import {WindowRefService} from "./window-ref.service";

@Injectable({
  providedIn: 'root'
})
export class NPSAPIClientService {
  workerMgr;

  constructor(private windowRef : WindowRefService) {
    this.workerMgr = new NPSAPIWorkerManager(
      'assets/js/worker.js',
      windowRef.nativeWindow);
  }

  retrieve(query : NPSAPIQuery) {
    return NPSModel.retrieve(query, this.workerMgr);
  }
}
