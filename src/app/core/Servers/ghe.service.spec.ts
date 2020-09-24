import { TestBed } from '@angular/core/testing';

import { GheService } from './ghe.service';

describe('GheService', () => {
  let service: GheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
