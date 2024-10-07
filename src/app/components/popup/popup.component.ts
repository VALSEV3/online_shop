import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  balance = '';


  constructor(private router:Router) {}

  topUp() {
    alert(`you top up your balance ${this.balance}`)
    localStorage.setItem('balance', this.balance);
    console.log(this.balance);
    this.router.navigate(['/home-page'])
  }
}
