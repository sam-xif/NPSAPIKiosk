import { Injectable } from '@angular/core';
import INPSAPIWorkerManager, { NPSAPIWorkerManager } from '../nps/NPSAPIWorkerManager';
import INPSAPIQuery from '../nps/NPSAPIQuery';
import { INPSModelDAO, NPSModelDAO } from '../nps/NPSModel';
import { WindowRefService } from "./window-ref.service";
import { NPSModelDAOProviderService } from "./npsmodel-daoprovider.service";

@Injectable({
  providedIn: 'root'
})
export class NPSAPIClientService {
  workerMgr : INPSAPIWorkerManager;
  dao : INPSModelDAO;

  constructor(private windowRef : WindowRefService, private daoProvider : NPSModelDAOProviderService) {
    if (windowRef.nativeWindow) {
      this.workerMgr = new NPSAPIWorkerManager(
        'assets/js/worker.js',
        windowRef.nativeWindow);
    }
    this.dao = daoProvider.getDAOBuilder()(this.workerMgr);
  }

  retrieve(query : INPSAPIQuery) {
    return this.dao.retrieve(query, this.workerMgr);
  }
}
