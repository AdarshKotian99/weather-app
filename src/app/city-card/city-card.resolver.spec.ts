import { TestBed } from '@angular/core/testing';

import { CityCardResolver } from './city-card.resolver';

describe('CityCardResolver', () => {
  let resolver: CityCardResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CityCardResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
