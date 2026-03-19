import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-navbar.html',
  styleUrl: './sidebar-navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarNavbar {
  private readonly router = inject(Router);

  readonly isCollapsed = signal(false);

  readonly navItems = computed<NavItem[]>(() =>
    this.router.config
      .filter((route) => route.data?.['label'])
      .map((route) => ({
        path: route.path ?? '',
        label: route.data!['label'] as string,
        icon: route.data!['icon'] as string,
      })),
  );

  toggle(): void {
    this.isCollapsed.update((v) => !v);
  }
}
