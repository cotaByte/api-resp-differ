import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'compare',
    pathMatch: 'full',
  },
  {
    path: 'compare',
    loadComponent: () => import('./features/compare/compare').then((m) => m.Compare),
    data: { label: 'Collections', icon: 'compare' },
  },
  {
    path: 'history',
    loadComponent: () => import('./features/history/history').then((m) => m.History),
    data: { label: 'History', icon: 'history' },
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/settings/settings').then((m) => m.Settings),
  },
];
