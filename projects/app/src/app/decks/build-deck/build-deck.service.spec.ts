import { TestBed } from '@angular/core/testing';

import { BuildDeckService } from './build-deck.service';

describe('BuildDeckService', () => {
  let service: BuildDeckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildDeckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
