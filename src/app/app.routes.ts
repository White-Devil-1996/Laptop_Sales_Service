import { Routes } from '@angular/router';

export const routes: Routes = [
  // Default redirect
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Home screen (lazy-loaded standalone component)
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home').then(m => m.Home)
  },

  // Landing Screen
//   {
//     path: 'landing-screen',
//     loadComponent: () =>
//       import('./landing-screen/landing-screen').then(
//         m => m.LandingScreen
//       )
//   },

  // 404 fallback
  { path: '**', redirectTo: 'home' }
];
