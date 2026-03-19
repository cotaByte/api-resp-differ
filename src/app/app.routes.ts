import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'compare',
    pathMatch: 'full',
  },
  {
    path: 'collections',
    loadComponent: () =>
      import('./features/collections/components/collection-list/collection-list').then(
        (m) => m.CollectionList,
      ),
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
