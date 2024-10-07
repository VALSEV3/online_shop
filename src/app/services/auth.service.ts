import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged,GithubAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private auth: Auth, private userService: UserService, private router: Router) {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    this.userSubject.next(storedUser);
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
// Метод для регистрации с обработкой случая, когда email уже зарегистрирован
async registerWithEmail(email: string, password: string): Promise<any> {
  try {
    // Попытка зарегистрировать пользователя
    const result = await createUserWithEmailAndPassword(this.auth, email, password);
    await this.userService.saveUserData(result.user);  // Сохранение данных пользователя
    this.router.navigate(['/app-profile']);  // Перенаправляем на профиль
    return result.user;  // Возвращаем информацию о пользователе
  } catch (error: any) {
    // Обработка ошибки, если email уже используется
    if (error.code === 'auth/email-already-in-use') {
      console.log('Email уже зарегистрирован, выполняется вход...');
      // Пытаемся выполнить вход с теми же email и паролем
      return await this.signInWithEmail(email, password);
    } else {
      throw error;  // Перебрасываем остальные ошибки
    }
  }
}

// Метод для входа через email и пароль
async signInWithEmail(email: string, password: string): Promise<any> {
  try {
    // Попытка войти в систему
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    this.userSubject.next(userCredential.user);  // Установка текущего пользователя
    this.router.navigate(['/app-profile']); // Перенаправляем на страницу профиля после успешного входа
    return userCredential.user;
  } catch (error: any) {
    // Логируем и пробрасываем ошибку при входе
    console.error('Ошибка при входе через email и пароль:', error);
    if (error.code === 'auth/wrong-password') {
      alert('Неверный пароль. Пожалуйста, попробуйте снова.');
    } else if (error.code === 'auth/user-not-found') {
      alert('Пользователь не найден.');
    } else {
      alert('Ошибка при входе. Попробуйте снова.');
    }
    throw error;
  }
}


  // Метод для получения текущего пользователя
  getUser() {
    return this.userSubject.asObservable(); // Возвращаем Observable, чтобы можно было подписаться
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


  getUserPromise(): Promise<any> {
    return new Promise((resolve) => {
      const user = this.userSubject.value; // Получаем текущее значение
      resolve(user); // Возвращаем значение
    });
  }



}
