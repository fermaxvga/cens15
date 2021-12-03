import { TestBed } from '@angular/core/testing';

import { CompartidosService } from './compartidos.service';

describe('CompartidosService', () => {
  let service: CompartidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompartidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
