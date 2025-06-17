import {TestBed} from '@angular/core/testing';

import {OwnableService} from './ownable-service';

describe('OwnableService', () => {
  let service: OwnableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
