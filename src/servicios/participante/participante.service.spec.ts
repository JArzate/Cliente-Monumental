import { TestBed, inject } from '@angular/core/testing';

import { ParticipanteService } from './participante.service';

describe('ParticipanteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParticipanteService]
    });
  });

  it('should be created', inject([ParticipanteService], (service: ParticipanteService) => {
    expect(service).toBeTruthy();
  }));
});
