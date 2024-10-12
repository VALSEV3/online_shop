import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent {
  balance = '';

  constructor(private router: Router) {}

  topUp() {
    // Проверим, что баланс введен корректно
    if (!this.balance || isNaN(Number(this.balance))) {
      alert('Please enter a valid amount.');
      return;
    }

    alert(`You top up your balance: $${this.balance}`);
    localStorage.setItem('balance', this.balance);

    // Закрываем модальное окно
    this.closeModal();

    // Выполняем перенаправление после закрытия модального окна
    this.router.navigate(['/home-page']);
  }

 closeModal() {
  const modalElement = document.getElementById('exampleModal');
  if (modalElement) {
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
    } else {
      // Initialize the modal if no instance exists yet
      const newModal = new bootstrap.Modal(modalElement);
      newModal.hide();
    }
  }
}

}
