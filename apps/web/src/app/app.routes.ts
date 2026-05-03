import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'collections',
    loadComponent: () =>
      import('./features/collections/collections.component').then((m) => m.CollectionsComponent),
  },
  {
    path: 'targets',
    loadComponent: () =>
      import('./features/targets/targets.component').then((m) => m.TargetsComponent),
  },
  { path: '', redirectTo: 'collections', pathMatch: 'full' },
];
