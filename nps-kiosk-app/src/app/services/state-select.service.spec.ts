import { TestBed } from '@angular/core/testing';

import { StateSelectService } from './state-select.service';

describe('StateSelectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateSelectService = TestBed.get(StateSelectService);
    expect(service).toBeTruthy();
  });
});
