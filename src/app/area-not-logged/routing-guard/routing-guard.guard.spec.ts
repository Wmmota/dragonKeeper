import { TestBed } from '@angular/core/testing';

import { RoutingGuard } from './routing-guard.guard';

describe('GuardGuard', () => {
  let guard: RoutingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoutingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
