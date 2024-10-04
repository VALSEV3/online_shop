import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged,GithubAuthProvider} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private auth: Auth, private userService: UserService, private router: Router) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  async githubSignIn(){
    const provider = new GithubAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account' // Этот параметр заставляет Google показывать окно выбора аккаунта
    });
    try {
      const result = await signInWithPopup(this.auth, provider);
      this.router.navigate(['/app-profile']);
      await this.userService.saveUserData(result.user);
      return result.user; // Возвращаем информацию о пользователе

    } catch (error) {
      console.error('Ошибка при входе через Github:', error);
      throw error;
    }

  }

  // Метод для входа через Google
  async googleSignIn() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account' // Этот параметр заставляет Google показывать окно выбора аккаунта
    });
    try {
      const result = await signInWithPopup(this.auth, provider);
      this.router.navigate(['/app-profile']);
      await this.userService.saveUserData(result.user);
      return result.user; // Возвращаем информацию о пользователе
    } catch (error) {
      console.error('Ошибка при входе через Google:', error);
      throw error;
    }
  }

  // Метод для получения текущего пользователя
  getUser() {
    return this.userSubject.asObservable(); // Возвращаем наблюдаемый объект
  }

  async logout() {
    try {
      await this.auth.signOut();
      this.userSubject.next(null);
      this.router.navigate(['/app-sign-up']);
      alert('User logged out successfully');
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
}
