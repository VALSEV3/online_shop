import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';
import { NgIf, NgClass } from '@angular/common';
import { SendMailService } from '../../../services/send-mail.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, NgIf, NgClass, FontAwesomeModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent {
  formGroup: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private sendMailService: SendMailService) {
    this.formGroup = this.formBuilder.group({
      name: new FormControl(''),
      message: new FormControl(''),
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.formGroup.value.name);
    formData.append('message', this.formGroup.value.message);

    this.sendMailService.sendEmail(formData)
      .then((response) => {
        if (response.ok) {
          this.successMessage = 'Feedback submitted successfully!';
          this.formGroup.reset(); // Reset form after submission
        } else {
          throw new Error('Failed to submit feedback');
        }
      })
      .catch((error) => {
        this.errorMessage = 'Error submitting feedback. Please try again.';
        console.error(error);
      });
  }
}
