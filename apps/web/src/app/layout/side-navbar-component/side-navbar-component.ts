import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItemDirective } from './nav-item.directive';
import { NavItem } from './nav-item';

@Component({
  selector: 'app-side-navbar-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-navbar-component.html',
  styleUrl: './side-navbar-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavbarComponent {
  @Input() items: NavItem[] = [];

  @ContentChildren(NavItemDirective)
  contentItems!: QueryList<NavItemDirective>;

  isExpanded = signal(false);

  toggle(): void {
    this.isExpanded.update((v) => !v);
  }

  get allItems(): NavItem[] {
    const fromContent = this.contentItems
      ? this.contentItems.toArray().map((d) => ({
          icon: d.icon,
          label: d.label,
          route: d.route,
        }))
      : [];
    return [...this.items, ...fromContent];
  }
}
