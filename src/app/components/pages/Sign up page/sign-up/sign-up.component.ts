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
  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
      // You could handle email/password signup here
    }
  }

  googleSignUp(){
    try{
      this.authService.googleSignIn();
      alert(`Hello ${this.userData.displayName}`)
    }
  catch(e){
    console.error(e);
  }
  }

  githubSignUp(){
    this.authService.githubSignIn();
    alert(`Hello ${this.userData.displayName}`)
  }

}
