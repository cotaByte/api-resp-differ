import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'collections',
    loadComponent: () =>
      import('./features/collections/collections.component').then((m) => m.CollectionsComponent),
  },
  { path: '', redirectTo: 'collections', pathMatch: 'full' },
];
