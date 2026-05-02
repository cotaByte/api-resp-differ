import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  cancelLabel = input('Cancel');
  acceptLabel = input('Accept');
  hideCancel = input(false);
  hideAccept = input(false);

  closed = output<void>();
  accepted = output<void>();
  $visible = signal<boolean>(false);

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  keyDownHandler = effect((onCleanup) => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.close();
      }
    };
    document.addEventListener('keydown', keydownHandler);
    onCleanup(() => document.removeEventListener('keydown', keydownHandler));
  });

  public open(): void {
    this.$visible.set(true);
  }

  public close(): void {
    this.closed.emit();
    this.$visible.set(false);
  }

  onAccept(): void {
    this.accepted.emit();
    this.close();
  }
}
