import { Injectable } from '@angular/core';
import { NPSAPIWorkerManager } from './lib/clientWorkerManager';
import { NPSAPIQuery } from './lib/client';
import { NPSModel } from './lib/model';
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
