import { TestBed } from '@angular/core/testing';

import { MangSliderService } from './mang-slider.service';

describe('MangSliderService', () => {
  let service: MangSliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MangSliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
