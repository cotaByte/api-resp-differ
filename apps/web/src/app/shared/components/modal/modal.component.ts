import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  output,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, merge, switchMap } from 'rxjs';

@Component({
  selector: 'modal',
  imports: [CdkPortal],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnDestroy {
  //#region INJECTS
  private readonly overlay = inject(Overlay);
  //#endregion INJECTS

  //#region STRATEGIES
  private get positionStrategy() {
    return this.overlay
      .position()
      .global()
      .centerHorizontally(this.parseToPixels(this.offsetX()))
      .centerVertically(this.parseToPixels(this.offsetY()));
  }

  private get scrollStrategy() {
    return this.overlay.scrollStrategies.reposition();
  }
  //#endregion STRATEGIES

  //#region INPUTS
  public readonly offsetX = input<string | number>(0);
  public readonly offsetY = input<string | number>(0);

  readonly cancelLabel = model('Cancel');
  readonly acceptLabel = model('Accept');
  readonly hideCancel = model(false);
  readonly hideAccept = model(false);
  readonly closeOnBackdrop = model(true);
  //#endregion INPUTS

  //#region DOM
  private readonly overlayRef = computed(() =>
    this.overlay.create({
      positionStrategy: this.positionStrategy,
      scrollStrategy: this.scrollStrategy,
      hasBackdrop: true,
    }),
  );
  private readonly hostElement = computed(() => this.overlayRef().hostElement);
  private template = viewChild.required(CdkPortal);

  public readonly visible = toSignal(
    toObservable(this.overlayRef).pipe(
      switchMap((overlay) =>
        merge(
          overlay.attachments().pipe(map(() => true)),
          overlay.detachments().pipe(map(() => false)),
        ),
      ),
    ),
    { initialValue: false },
  );
  //#endregion DOM

  //#region TEMPLATES
  readonly headerTemplate = model<TemplateRef<void> | null>(null);
  readonly bodyTemplate = model<TemplateRef<void> | null>(null);
  //#endregion TEMPLATES

  //#region OUTPUTS
  readonly closed = output<void>();
  readonly accepted = output<void>();
  //#endregion OUTPUTS

  //#region STATE

  public open() {
    const overlayRef = this.overlayRef();
    overlayRef.attach(this.template());
    this.bringToFront();
  }

  public close() {
    const overlayRef = this.overlayRef();
    if (overlayRef.hasAttached()) {
      overlayRef.detach();
      this.closed.emit();
    }
  }

  ngOnDestroy(): void {}

  private bringToFront() {
    const overlayRef = this.overlayRef();
    const hostElement = overlayRef.hostElement;
    const parentElement = hostElement.parentElement;

    if (!overlayRef.hasAttached() || !hostElement) return;
    if (parentElement?.lastElementChild === hostElement) return;

    parentElement?.appendChild(hostElement);
  }
  private parseToPixels(value: string | number): string {
    return typeof value === 'number' ? `${value}px` : value;
  }
}
