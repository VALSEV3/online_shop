import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SendMailService {
  constructor() {}

  sendEmail(formData: FormData): Promise<Response> {
    formData.append('apikey', environment.web3formsApiKey); // If the API requires the key in the body

    return fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });
  }

}
