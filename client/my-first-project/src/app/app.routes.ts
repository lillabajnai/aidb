import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent) },
    { path: 'movies', loadComponent: () => import('./pages/movies/movies.component').then((c) => c.MoviesComponent) },
    { path: 'watchlist', loadComponent: () => import('./pages/watchlist/watchlist.component').then((c) => c.WatchlistComponent) },
    { path: 'movie/:id', loadComponent: () => import('./pages/movie/movie.component').then((c) => c.MovieComponent) },
    { path: 'signup', loadComponent: () => import('./pages/signup/signup.component').then((c) => c.SignupComponent) },
    { path: 'user-management', loadComponent: () => import('./pages/user-management/user-management.component').then((c) => c.UserManagementComponent), canActivate: [authGuard] },
    { path: '**', redirectTo: 'login' }
];
