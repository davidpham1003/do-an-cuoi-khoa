import { TestBed } from '@angular/core/testing';

import { MuaVeGuard } from './mua-ve.guard';

describe('MuaVeGuard', () => {
  let guard: MuaVeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MuaVeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
