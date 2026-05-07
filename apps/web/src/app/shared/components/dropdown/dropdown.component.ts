import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  inject,
  input,
  OnDestroy,
  output,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { take } from 'rxjs';

export type DropdownFilterFn<T> = (options: T[], query: string) => T[];

@Component({
  selector: 'dropdown',
  imports: [CdkPortal, NgTemplateOutlet],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent<T extends Record<string, unknown>>
  implements ControlValueAccessor, OnDestroy
{
  //#region INJECTS
  private readonly overlay = inject(Overlay);
  //#endregion INJECTS

  //#region INPUTS
  readonly options = input<T[]>([]);
  readonly filterOptionsFn = input<DropdownFilterFn<T> | null>(null);
  readonly value = input.required<keyof T>();
  readonly label = input.required<keyof T>();
  readonly emptyOptionsPlaceholderLabel = input<string>('No options');
  readonly disabled = input<boolean>(false);
  readonly optionTemplate = input<TemplateRef<{ $implicit: T }> | null>(null);
  readonly fullData = input<boolean>(false);
  //#endregion INPUTS

  //#region OUTPUTS
  readonly selectionChange = output<T | T[keyof T]>();
  readonly dropdownOpen = output<void>();
  readonly dropdownClose = output<void>();
  //#endregion OUTPUTS

  //#region STATE
  readonly _searchQuery = signal<string>('');
  public readonly selectedOption = signal<T | null>(null);
  readonly _isOpen = signal<boolean>(false);
  private readonly _cvaDisabled = signal<boolean>(false);
  //#endregion STATE

  //#region CVA CALLBACKS
  private _onChange: (value: unknown) => void = () => {};
  private _onTouched: () => void = () => {};
  //#endregion CVA CALLBACKS

  //#region DOM
  private readonly triggerEl = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  private readonly portal = viewChild.required(CdkPortal);
  private _overlayRef: OverlayRef | null = null;
  //#endregion DOM

  //#region COMPUTED
  readonly isDisabled = computed(() => this.disabled() || this._cvaDisabled());

  readonly filteredOptions = computed<T[]>(() => {
    const fn = this.filterOptionsFn();
    const query = this._searchQuery();
    const opts = this.options();

    if (fn) return fn(opts, query);
    if (!query) return opts;

    const labelKey = this.label();
    return opts.filter((o) => String(o[labelKey]).toLowerCase().includes(query.toLowerCase()));
  });

  readonly selectedLabel = computed(() => {
    const opt = this.selectedOption();
    return opt ? String(opt[this.label()]) : null;
  });

  readonly hasSearchInput = computed(() => this.filterOptionsFn() !== null);
  //#endregion COMPUTED

  //#region OVERLAY
  private getOverlayRef(): OverlayRef {
    if (this._overlayRef) return this._overlayRef;

    this._overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.triggerEl().nativeElement)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: 4,
          },
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
            offsetY: -4,
          },
        ])
        .withFlexibleDimensions(false)
        .withPush(false),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    return this._overlayRef;
  }

  open(): void {
    if (this.isDisabled() || this._isOpen()) return;

    const ref = this.getOverlayRef();
    ref.updateSize({ minWidth: this.triggerEl().nativeElement.offsetWidth });
    ref.attach(this.portal());
    ref
      .backdropClick()
      .pipe(take(1))
      .subscribe(() => this.close());

    this._isOpen.set(true);
    this.dropdownOpen.emit();
  }

  close(): void {
    const ref = this._overlayRef;
    if (ref?.hasAttached()) {
      ref.detach();
      this._isOpen.set(false);
      this._searchQuery.set('');
      this.dropdownClose.emit();
    }
  }
  //#endregion OVERLAY

  //#region SELECTION
  selectOption(option: T): void {
    this.selectedOption.set(option);
    const emitValue = this.fullData() ? option : option[this.value()];
    this._onChange(emitValue);
    this._onTouched();
    this.selectionChange.emit(emitValue as T | T[keyof T]);
    this.close();
  }
  //#endregion SELECTION

  //#region CONTROL VALUE ACCESSOR
  /**
   * Called by Angular forms to set the value programmatically (e.g. ngModel default value).
   * Deliberately does NOT call _onChange to prevent re-triggering change detection loops.
   */
  writeValue(val: unknown): void {
    if (val == null) {
      this.selectedOption.set(null);
      return;
    }
    const valueKey = this.value();
    const match = this.options().find((o) => o[valueKey] === val);
    this.selectedOption.set(match ?? null);
  }

  registerOnChange(fn: (v: unknown) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._cvaDisabled.set(isDisabled);
  }
  //#endregion CONTROL VALUE ACCESSOR

  //#region HANDLERS
  onSearchChange(event: Event): void {
    this._searchQuery.set((event.target as HTMLInputElement).value);
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.open();
    }
  }

  onPanelKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      this.triggerEl().nativeElement.focus();
    }
  }
  //#endregion HANDLERS

  ngOnDestroy(): void {
    this._overlayRef?.dispose();
  }
}
