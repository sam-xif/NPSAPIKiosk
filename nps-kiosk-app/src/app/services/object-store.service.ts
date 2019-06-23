import { Injectable } from '@angular/core';
import {INPSObject} from "../../nps/NPSModel";

@Injectable({
  providedIn: 'root'
})
export class ObjectStoreService {
  private obj: INPSObject;

  constructor() {
    this.obj = undefined;
  }

  // TODO: Maybe implement a queue if necessary

  hasObject(): boolean {
    return this.obj !== undefined;
  }

  getObject(): INPSObject {
    return this.obj;
  }

  setObject(park: INPSObject) {
    this.obj = park;
  }

  clearObject() {
    this.obj = undefined;
  }
}
