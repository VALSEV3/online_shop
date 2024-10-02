import { Routes } from '@angular/router';
import { HomeComponent } from './pages/Home Page/home/home.component';
import { AboutComponent } from './pages/about page/about/about.component';
import { BasketComponent } from './pages/basket page/basket/basket.component';
import { SignUpComponent } from './pages/Sign up page/sign-up/sign-up.component';

export const routes: Routes = [
  { path: 'home-page', component: HomeComponent },
  { path: 'app-about', component: AboutComponent },
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: 'app-basket', component: BasketComponent },
  { path: 'app-sign-up', component: SignUpComponent },
];
