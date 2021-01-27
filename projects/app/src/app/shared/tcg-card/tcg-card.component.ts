import {Component, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {Card} from 'pokemon-tcg-sdk-typescript/dist/classes/card';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {fromEvent, merge, Observable} from 'rxjs';
import {mergeAll, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-tcg-card',
  templateUrl: './tcg-card.component.html',
  styleUrls: ['./tcg-card.component.scss']
})
export class TcgCardComponent implements OnInit {

  private overlayRef!: OverlayRef;

  public hovered = false;

  @ViewChild('viewCardContent')
  private viewCardContent!: TemplateRef<any>;

  @Input()
  public isSelected = false;

  @Input()
  public selectable = false;

  @Input()
  public card!: Card;

  @Output()
  public selected = new EventEmitter<Card>();

  private destroy$ = new Observable<void>();

  @HostListener('mouseover')
  private startHover(event: Event): void {
    this.hovered = true;
  }

  @HostListener('mouseleave')
  private stopHover(event: Event): void {
    this.hovered = false;
  }

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.overlayRef = this.overlay.create({hasBackdrop: true, disposeOnNavigation: true, panelClass: 'view-card-wrapper'});
    merge([
      this.overlayRef.backdropClick(),
      fromEvent(document, 'keydown')
    ])
      .pipe(
        mergeAll(),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (event: any) => {
          if (event.keycode && event.keycode === 27) {
            this.overlayRef.detach();
          }
          if (!event.keycode) {
            this.overlayRef.detach();
          }
        }
      });
  }

  public selectCard(): void {
    this.emit();
  }

  public viewCard(): void {
    const portal = new TemplatePortal(this.viewCardContent, this.viewContainerRef);
    this.overlayRef.attach(portal);
  }

  private emit(): void {
    this.selected.emit(this.card);
  }
}
