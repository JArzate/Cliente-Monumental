import { TestBed, inject } from '@angular/core/testing';

import { AsientoService } from './asiento.service';

describe('AsientoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsientoService]
    });
  });

  it('should be created', inject([AsientoService], (service: AsientoService) => {
    expect(service).toBeTruthy();
  }));
});
