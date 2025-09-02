import { TestBed } from '@angular/core/testing';

import { GeonesService } from './geones.service';

describe('GeonesService', () => {
  let service: GeonesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeonesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
