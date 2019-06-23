import { Injectable } from '@angular/core';
import {INPSObject, NPSObjectBuilder} from "../../nps/NPSModel";

@Injectable({
  providedIn: 'root'
})
export class ObjectStoreService {
  private stack: Array<INPSObject>;

  constructor() {
    this.stack = [];
  }

  isEmpty(): boolean {
    return this.stack.length == 0;
  }

  clear() {
    this.stack = [];
  }

  push(obj: INPSObject) {
    this.stack.push(obj);
  }

  pop(): INPSObject {
    return this.stack.pop();
  }
}
