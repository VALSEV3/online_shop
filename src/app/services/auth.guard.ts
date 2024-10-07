import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Ожидаем инициализацию пользователя с помощью Promise
  const user = await authService.getUserPromise();

  if (user === null) {
    router.navigate(['/home-page']);
    return false;
  }
  return true;
};
