import { TestBed } from '@angular/core/testing';

import { NPSAPIClientService } from './npsapiclient.service';

describe('NPSAPIClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NPSAPIClientService = TestBed.get(NPSAPIClientService);
    expect(service).toBeTruthy();
  });
});
