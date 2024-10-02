import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../header/header.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

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

  constructor(private fb: FormBuilder, public auth: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
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

  // Handle Google Sign-In
  async signInWithGoogle(): Promise<void> {
    try {
      console.log('Google Sign-In Successful');
    } catch (error) {
      console.error('Google Sign-In Error', error);
    }
  }
}
