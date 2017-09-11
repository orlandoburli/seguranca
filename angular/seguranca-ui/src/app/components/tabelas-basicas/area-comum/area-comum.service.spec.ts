import { TestBed, inject } from '@angular/core/testing';

import { AreaComumService } from './area-comum.service';

describe('AreaComumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreaComumService]
    });
  });

  it('should be created', inject([AreaComumService], (service: AreaComumService) => {
    expect(service).toBeTruthy();
  }));
});
