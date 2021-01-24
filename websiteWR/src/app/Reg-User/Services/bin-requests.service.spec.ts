import { TestBed } from '@angular/core/testing';

import { BinRequestsService } from './bin-requests.service';

describe('BinRequestsService', () => {
  let service: BinRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BinRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
