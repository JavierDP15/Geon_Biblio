import { TestBed } from '@angular/core/testing';

import { FerhelesService } from './ferheles.service';

describe('FerhelesService', () => {
  let service: FerhelesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FerhelesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
