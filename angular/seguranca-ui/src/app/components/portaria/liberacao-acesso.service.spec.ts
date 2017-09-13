import { TestBed, inject } from '@angular/core/testing';

import { LiberacaoAcessoService } from './liberacao-acesso.service';

describe('LiberacaoAcessoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiberacaoAcessoService]
    });
  });

  it('should be created', inject([LiberacaoAcessoService], (service: LiberacaoAcessoService) => {
    expect(service).toBeTruthy();
  }));
});
