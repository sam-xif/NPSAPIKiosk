import { Injectable } from '@angular/core';
import {INPSAPIWorkerManager, NPSAPIWorkerManager} from '../../nps/NPSAPIWorkerManager';
import {INPSAPIQuery} from '../../nps/NPSAPIQuery';
import { INPSModelDAO } from '../../nps/NPSModelDAO';
import { WindowRefService } from "./window-ref.service";
import { NPSModelDAOProviderService } from "./npsmodel-daoprovider.service";
import {INPSDataAccessStrategy} from "../../nps/NPSDataAccessStrategy";
import {NPSDataSource} from "../../nps/NPSDataSource";

@Injectable({
  providedIn: 'root'
})
export class NPSAPIClientService {
  private readonly workerMgr : INPSAPIWorkerManager;
  private readonly dao : INPSModelDAO;

  constructor(private windowRef : WindowRefService, private daoProvider : NPSModelDAOProviderService) {
    if (windowRef.nativeWindow) {
      this.workerMgr = new NPSAPIWorkerManager(
        'assets/js/worker.js', // This is a singleton instance, so no duplicate workers are created
        windowRef.nativeWindow);
    }
    this.dao = daoProvider.getDAOBuilder()(this.workerMgr);
  }

  retrieve(query: INPSAPIQuery, strategy: INPSDataAccessStrategy): NPSDataSource {
    return strategy.getData(query, this.dao);
  }
}
