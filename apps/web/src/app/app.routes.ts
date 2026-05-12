import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'targets',
    loadComponent: () =>
      import('./features/targets/targets.component').then((m) => m.TargetsComponent),
  },
  { path: '', redirectTo: 'targets', pathMatch: 'full' },
];
