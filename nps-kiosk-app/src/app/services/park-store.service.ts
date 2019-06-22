import { Injectable } from '@angular/core';
import {INPSObject} from "../../nps/NPSModel";

@Injectable({
  providedIn: 'root'
})
export class ParkStoreService {
  private park: INPSObject;

  constructor() {
    this.park = undefined;
  }

  // TODO: Maybe implement a queue if necessary

  hasObject(): boolean {
    return this.park !== undefined;
  }

  getObject(): INPSObject {
    return this.park;
  }

  setObject(park: INPSObject) {
    this.park = park;
  }
}
