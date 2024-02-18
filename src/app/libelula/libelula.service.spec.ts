import { TestBed } from '@angular/core/testing';

import { LibelulaService } from './libelula.service';

describe('LibelulaService', () => {
  let service: LibelulaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibelulaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
