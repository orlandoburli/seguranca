import { TestBed, inject } from '@angular/core/testing';

import { MoradorService } from './morador.service';

describe('MoradorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoradorService]
    });
  });

  it('should be created', inject([MoradorService], (service: MoradorService) => {
    expect(service).toBeTruthy();
  }));
});
