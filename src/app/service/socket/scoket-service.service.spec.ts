import { TestBed } from '@angular/core/testing';

import { ScoketServiceService } from './scoket-service.service';

describe('ScoketServiceService', () => {
  let service: ScoketServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoketServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
