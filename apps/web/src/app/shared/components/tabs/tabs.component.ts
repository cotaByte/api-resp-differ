import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  input,
  output,
  signal,
  TemplateRef,
  viewChild,
  viewChildren,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TabComponent } from './tab/tab.component';

interface TabMeta {
  id: string;
  label: string;
  headerTpl: TemplateRef<void> | null;
}

@Component({
  selector: 'app-tabs',
  imports: [NgTemplateOutlet],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  //#region INPUTS
  readonly height = input<string | null>(null);
  readonly selectedTab = input<string>('');
  //#endregion INPUTS

  //#region OUTPUTS
  readonly selectionChange = output<string>();
  readonly tabsInitialized = output<string[]>();
  //#endregion OUTPUTS

  //#region CONTENT CHILDREN
  readonly tabs = contentChildren(TabComponent);
  //#endregion CONTENT CHILDREN

  //#region DERIVED STATE
  readonly tabIds = computed<string[]>(() => this.tabs().map((t) => t.id()));

  protected readonly tabMeta = computed<TabMeta[]>(() =>
    this.tabs().map((t) => ({
      id: t.id(),
      label: t.label(),
      headerTpl: t.headerTemplate() ?? null,
    }))
  );
  //#endregion DERIVED STATE

  //#region INTERNAL STATE
  protected readonly activeTabId = signal<string>('');
  //#endregion INTERNAL STATE

  //#region VIEW REFS
  private readonly tabsBodyRef = viewChild<ElementRef<HTMLElement>>('tabsBody');
  private readonly tabButtonRefs =
    viewChildren<ElementRef<HTMLButtonElement>>('tabBtn');
  //#endregion VIEW REFS

  private readonly selectedTabEffect = effect(() => {
    const id = this.selectedTab();
    if (id && id !== this.activeTabId()) {
      this.setActiveTab(id);
    }
  });

  constructor() {
    afterNextRender(() => {
      const ids = this.tabIds();
      const initialId = this.selectedTab() || ids[0] || '';
      if (initialId) {
        this.setActiveTab(initialId);
      }
      this.tabsInitialized.emit(ids);
    });

    this.selectedTabEffect;
  }

  //#region PUBLIC METHODS
  selectTab(id: string): void {
    if (id === this.activeTabId()) return;
    this.setActiveTab(id);
    this.selectionChange.emit(id);
  }

  protected onTabKeydown(event: KeyboardEvent, currentId: string): void {
    const ids = this.tabIds();
    const idx = ids.indexOf(currentId);
    let next = idx;

    if (event.key === 'ArrowRight') next = (idx + 1) % ids.length;
    else if (event.key === 'ArrowLeft') next = (idx - 1 + ids.length) % ids.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = ids.length - 1;
    else return;

    event.preventDefault();
    this.selectTab(ids[next]);
    this.tabButtonRefs()[next]?.nativeElement.focus();
  }
  //#endregion PUBLIC METHODS

  //#region PRIVATE METHODS
  private setActiveTab(id: string): void {
    const tabs = this.tabs();
    const index = tabs.findIndex((t) => t.id() === id);
    if (index === -1) return;

    const container = this.tabsBodyRef()?.nativeElement;
    if (container) {
      container.scrollTo({
        left: index * container.offsetWidth,
        behavior: 'instant',
      });
    }

    tabs.forEach((t) => t.selected.set(t.id() === id));
    this.activeTabId.set(id);
  }
  //#endregion PRIVATE METHODS
}
