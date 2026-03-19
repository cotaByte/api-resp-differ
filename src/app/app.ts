import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarNavbar } from './layout/components/sidebar-navbar/sidebar-navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarNavbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
