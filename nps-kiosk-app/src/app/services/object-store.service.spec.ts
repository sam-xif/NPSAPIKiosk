import { TestBed } from '@angular/core/testing';

import { ObjectStoreService } from './object-store.service';

describe('ObjectStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObjectStoreService = TestBed.get(ObjectStoreService);
    expect(service).toBeTruthy();
  });
});
