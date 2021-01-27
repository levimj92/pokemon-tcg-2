import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Card} from 'pokemon-tcg-sdk-typescript/dist/classes/card';
import {SearchParams, TcgCardListService} from './tcg-card-list.service';
import {debounceTime, pluck, takeUntil, tap} from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-tcg-card-list',
  templateUrl: './tcg-card-list.component.html',
  styleUrls: ['./tcg-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TcgCardListService]
})
export class TcgCardListComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  @Input()
  public selectable = false;

  @Output()
  public cards: EventEmitter<Card[]> = new EventEmitter<Card[]>();

  @Input()
  public selectedCards: Card[] = [];

  public totalCardsCount = 0;
  public selectedCardsListExpanded = false;

  public form: FormGroup;
  public cardsList$: Observable<Card[]>;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private matSnackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private cardsSearchService: TcgCardListService) {
    this.form = this.formBuilder.group({
      name: [''],
      page: [1, Validators.required],
      pageSize: [50, Validators.required]
    });
    this.cardsList$ = this.cardsSearchService.cardsList()
      .pipe(
        tap((res) => this.totalCardsCount = res.totalCount),
        pluck('cards')
      );
  }

  ngOnInit(): void {
    this.searchByNameListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private emitCards(): void {
    this.cards.emit(this.selectedCards);
  }

  public paginationListener(page: PageEvent): void {
    this.form.patchValue({page: page.pageIndex + 1, pageSize: page.pageSize});
    this.submit({
      pageSize: this.form.get('pageSize')?.value,
      page: this.form.get('page')?.value
    });
  }

  public submit(params: Partial<SearchParams>): void {
    this.cardsSearchService.updateParams(params);
  }

  public searchByNameListener(): void {
    this.form.get('name')?.valueChanges
      .pipe(
        debounceTime(300),
        tap(_ => this.form.patchValue({page: 1}, {emitEvent: false})),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: _ => {
          this.submit({
            name: this.form.get('name')?.value,
            page: this.form.get('page')?.value,
          });
        },
        error: err => this.matSnackBar.open(err, undefined, {duration: 5})
      });
  }

  public cardTrackByFn(index: number, item: Card): boolean {
    return !!item?.id;
  }

  public selectCard(card: Card): void {
    const cardExists = this.selectedCards.find(selectedCard => selectedCard.id === card.id);
    if (cardExists) {
      this.selectedCards = [...this.selectedCards.filter(selectedCard => selectedCard.id !== card.id)];
    }
    if (!cardExists) {
      this.selectedCards = [...this.selectedCards, card];
    }
    this.emitCards();
  }

  public isSelected(card: Card): boolean {
    return !!this.selectedCards.find(selectedCard => selectedCard.id === card.id);
  }

  public expandSelectedCardsList(): void {
    this.selectedCardsListExpanded = !this.selectedCardsListExpanded;
  }
}
