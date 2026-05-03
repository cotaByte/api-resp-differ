import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavbarComponent } from './layout/side-navbar-component/side-navbar-component';
import { NavItem } from './layout/side-navbar-component/nav-item';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideNavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  navItems: NavItem[] = [
    { icon: 'home', label: 'Home', route: '/' },
    { icon: 'folder', label: 'Collections', route: '/collections' },
    { icon: 'open_in_browser', label: 'Targets', route: '/targets' },
    { icon: 'automation', label: 'Runs', route: '/runs' },
  ];
}
