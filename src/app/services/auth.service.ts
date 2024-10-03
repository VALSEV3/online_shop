import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { UserService } from './user.service'; // Импортируем UserService

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private userService: UserService) {}

  // Вход через Google
  async googleSignIn() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);

    // Сохраняем данные пользователя в Firestore
    await this.userService.saveUserData(result.user);

    return result;
  }
}
