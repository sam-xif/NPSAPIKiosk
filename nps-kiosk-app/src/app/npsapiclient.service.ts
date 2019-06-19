import { Injectable } from '@angular/core';
import INPSAPIWorkerManager, { NPSAPIWorkerManager } from '../nps/NPSAPIWorkerManager';
import INPSAPIQuery from '../nps/NPSAPIQuery';
import { NPSModel } from '../nps/model';
import { WindowRefService } from "./window-ref.service";

@Injectable({
  providedIn: 'root'
})
export class NPSAPIClientService {
  workerMgr : INPSAPIWorkerManager;

  constructor(private windowRef : WindowRefService) {
    if (windowRef.nativeWindow) {
      this.workerMgr = new NPSAPIWorkerManager(
        'assets/js/worker.js',
        windowRef.nativeWindow);
    }
  }

  retrieve(query : INPSAPIQuery) {
    return NPSModel.retrieve(query, this.workerMgr);
  }
}
