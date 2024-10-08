import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/Home Page/home/home.component';
import { AboutComponent } from './components/pages/about page/about/about.component';
import { BasketComponent } from './components/pages/basket page/basket/basket.component';
import { SignUpComponent } from './components/pages/Sign up page/sign-up/sign-up.component';
import { ProfileComponent } from './components/pages/Profile page/profile/profile.component';
import { authGuard } from './services/auth.guard';
import { signGuard } from './services/sign-guard.guard';
import { FeedbackComponent } from './components/pages/feedback/feedback.component';
export const routes: Routes = [
  { path: 'home-page', component: HomeComponent },
  { path: 'app-about', component: AboutComponent },
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: 'app-basket', component: BasketComponent },
  { path: 'app-sign-up', component: SignUpComponent ,canActivate:[signGuard]},
  { path: 'app-profile', component: ProfileComponent,canActivate:[authGuard] },
  { path: 'app-feedback', component:FeedbackComponent },
];
