import { TestBed } from '@angular/core/testing';

import { NPSModelDAOProviderService } from './npsmodel-daoprovider.service';

describe('NPSModelDAOProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NPSModelDAOProviderService = TestBed.get(NPSModelDAOProviderService);
    expect(service).toBeTruthy();
  });
});
