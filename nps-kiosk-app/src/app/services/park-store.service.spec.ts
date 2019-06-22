import { TestBed } from '@angular/core/testing';

import { ParkStoreService } from './park-store.service';

describe('ParkStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParkStoreService = TestBed.get(ParkStoreService);
    expect(service).toBeTruthy();
  });
});
