import { Component, OnInit, DoCheck } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../services/card.service';
import { Card } from '../models/card';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [NgIf, RouterLink, RouterLinkActive, RouterOutlet, MatBadgeModule, NgClass],
})
export class HeaderComponent implements OnInit, DoCheck {
  basket: Card[] = [];
  newbadge=0;
  isDarkMode = false;
  badge = 0;
  currentRoute = '';
  basketOpened = false;

  constructor(private cardService: CardService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const basketOpened=localStorage.getItem('basketOpened')
    if(basketOpened){
      this.basketOpened=JSON.parse(basketOpened)
    }else{
       this.basketOpened = false;
    }

    const savedTheme = localStorage.getItem('darkMode');
    this.isDarkMode = savedTheme === 'true';

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    }

    this.currentRoute = this.router.url;
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  ngDoCheck(): void {
    this.basket = this.cardService.getBasket();
    if(this.currentRoute === '/app-basket'){
          this.basketOpened = true;
          localStorage.setItem('basketOpened', JSON.stringify(this.basketOpened))
    }else{
      this.newbadge = this.basketOpened ? 0 : this.basket.length;
      this.basketOpened = false;
      localStorage.setItem('basketOpened', JSON.stringify(this.basketOpened));
    }
    this.badge=this.newbadge;

  }

  onDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
