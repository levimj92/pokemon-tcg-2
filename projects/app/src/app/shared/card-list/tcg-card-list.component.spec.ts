import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TcgCardListComponent } from './tcg-card-list.component';

describe('CardListComponent', () => {
  let component: TcgCardListComponent;
  let fixture: ComponentFixture<TcgCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TcgCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TcgCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
