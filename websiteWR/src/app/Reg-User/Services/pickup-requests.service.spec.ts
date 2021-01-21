import { TestBed } from '@angular/core/testing';

import { PickupRequestsService } from './pickup-requests.service';

describe('PickupRequestsService', () => {
  let service: PickupRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PickupRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
