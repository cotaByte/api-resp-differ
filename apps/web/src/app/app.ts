import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavbarComponent } from './layout/side-navbar-component/side-navbar-component';
import { NavItem } from './layout/side-navbar-component/nav-item';
import { ModalComponent } from './shared/components/modal/modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideNavbarComponent, ModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  navItems: NavItem[] = [
    { icon: 'home', label: 'Home', route: '/' },
    { icon: 'compare_arrows', label: 'Compare', route: '/compare' },
    { icon: 'folder', label: 'Collections', route: '/collections' },
    { icon: 'settings', label: 'Settings', route: '/settings' },
  ];
}
