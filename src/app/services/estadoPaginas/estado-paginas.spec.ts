import { TestBed } from '@angular/core/testing';

import { EstadoPaginasService } from './estado-paginas';

describe('EstadoPaginas', () => {
  let service: EstadoPaginasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoPaginasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
