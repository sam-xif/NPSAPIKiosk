import { Injectable } from '@angular/core';
import { NPSModelDAO } from "../../nps/NPSModel";
import INPSAPIWorkerManager from "../../nps/NPSAPIWorkerManager";

@Injectable({
  providedIn: 'root'
})
export class NPSModelDAOProviderService {

  constructor() { }

  getDAOBuilder() {
    return (workerMgr: INPSAPIWorkerManager) => new NPSModelDAO(workerMgr);
  }
}
