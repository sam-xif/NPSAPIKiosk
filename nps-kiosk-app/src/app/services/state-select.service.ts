import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateSelectService {
  private selectedState: string;

  constructor() {
    this.selectedState = undefined;
  }

  hasState(): boolean {
    return this.selectedState !== undefined;
  }

  setState(stateCode: string) {
    this.selectedState = stateCode;
  }

  getState(): string {
    return this.selectedState;
  }

  clearState() {
    this.selectedState = undefined;
  }
}
