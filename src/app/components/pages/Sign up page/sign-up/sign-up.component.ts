import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HeaderComponent } from '../../../header/header.component';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'] // Correct property name to styleUrls
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  showPassword: boolean = false;  // Password visibility toggle
userData:any;
  constructor(private fb: FormBuilder,private authService:AuthService,private userService:UserService) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.userService.getUserData().then(data => {
      this.userData = data;
    });
  }

  // Toggle the password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Handle form submission
  async onSubmit(): Promise<void> {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
      try {
        const user = await this.authService.registerWithEmail(email, password);
        console.log('Пользователь зарегистрирован:', user);
        alert(`Регистрация успешна! Добро пожаловать, ${user.email}`);
      } catch (error: any) {
        console.error('Ошибка при регистрации:', error);
        if (error.message === 'Этот email уже зарегистрирован. Попробуйте войти в систему.') {
          alert(error.message);  // Выводим сообщение, если email уже используется
        } else {
          alert('Ошибка при регистрации. Попробуйте снова.');
        }
      }
    } else {
      alert('Форма некорректна. Пожалуйста, проверьте введённые данные.');
    }
  }


  async googleSignUp(){
    try{
      this.authService.googleSignIn();
      alert(`Hello ${this.userData.displayName}`)
    }
  catch(e){
    console.error(e);
  }
  }

  githubSignUp(){
    try{
      this.authService.githubSignIn();
      alert(`Hello ${this.userData.displayName}`)
    }
  catch(e){
    console.error(e);
  }
  }

}
