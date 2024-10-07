import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CanActivateFn } from '@angular/router';

export const signGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Wait for user initialization via Promise
  const user = await authService.getUserPromise();
  console.log('signGuard - User:', user); // Log the user value

  if (user !== null) {
    console.log('User is logged in, redirecting to /home-page');
    router.navigate(['/home-page']);
    return false;
  }

  console.log('User is not logged in, allowing access to /app-sign-up');
  return true;
};
