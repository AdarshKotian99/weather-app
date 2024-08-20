import { TestBed } from '@angular/core/testing';

import { ResolveLocationService } from './resolve-location.service';

describe('ResolveLocationService', () => {
  let service: ResolveLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResolveLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
