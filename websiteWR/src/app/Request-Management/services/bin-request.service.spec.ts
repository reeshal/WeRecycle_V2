import { TestBed } from '@angular/core/testing';

import { BinRequestService } from './bin-request.service';

describe('BinRequestService', () => {
  let service: BinRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BinRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
