import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Card} from 'pokemon-tcg-sdk-typescript/dist/classes/card';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {map, switchMap, takeUntil} from 'rxjs/operators';

@Injectable()
export class TcgCardListService implements OnDestroy {

  private readonly BASE_URL: string = 'https://api.pokemontcg.io/v1';
  private readonly DEFAULT_PARAMS: SearchParams = {
    name: '',
    page: 1,
    pageSize: 50
  };

  private cardsList$: ReplaySubject<{totalCount: number, cards: Card[]}> = new ReplaySubject<{totalCount: number, cards: Card[]}>(1);
  private searchParams$: BehaviorSubject<SearchParams> = new BehaviorSubject<SearchParams>(this.DEFAULT_PARAMS);
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private httpClient: HttpClient) {
    this.init();
  }

  private init(): void {
    this.searchCardsHandler();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public cardsList(): Observable<{totalCount: number, cards: Card[]}> {
    return this.cardsList$.asObservable();
  }

  public searchParams(): Observable<SearchParams> {
    return this.searchParams$.asObservable();
  }

  public updateParams(searchParams: Partial<SearchParams>): void {
    this.searchParams$.next({...this.searchParams$.getValue(), ...searchParams});
  }

  private updateCards(cards: {totalCount: number, cards: Card[]}): void {
    this.cardsList$.next(cards);
  }

  private searchCardsHandler(): void {
    // @ts-ignore
    this.searchParams()
      .pipe(
        switchMap((searchParams) => this.search(searchParams)),
        map((response: HttpResponse<Card[]>) => {
          return {
            totalCount: response.headers.get('total-count'),
            ...response.body
          };
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (cards: {totalCount: number, cards: Card[]}) => this.updateCards(cards)
      });
  }

  private search(searchParams: SearchParams): Observable<HttpResponse<Card[]>> {
    const params = new HttpParams()
      .set('name', searchParams.name)
      .set('page', `${searchParams.page}`)
      .set('pageSize', `${searchParams.pageSize}`);
    return this.httpClient.get(`${this.BASE_URL}/cards`, {params, observe: 'response'}) as Observable<HttpResponse<Card[]>>;
  }
}

export interface SearchParams {
  name: string;
  page: number;
  pageSize: number;
}
