import { TestBed } from '@angular/core/testing';

import { SalasPjService } from './salas-pj.service';

describe('SalasPjService', () => {
  let service: SalasPjService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalasPjService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
