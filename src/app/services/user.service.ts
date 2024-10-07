import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc,getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  // Сохранение данных пользователя в Firestore
  async saveUserData(user: any) {
    const userRef = doc(this.firestore, `users/${user.uid}`);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
        balance:user.balance,
      });
    }
  }


  async getUserData() {
    const user = this.auth.currentUser;
    if (user) {
      const userRef = doc(this.firestore, `users/${user.uid}`);
      const userDoc = await getDoc(userRef);
      return userDoc.data();
    }
    return null;
  }
}
