import { TestBed } from '@angular/core/testing';

import { TcgCardListService } from './tcg-card-list.service';

describe('CardsSearchService', () => {
  let service: TcgCardListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TcgCardListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
