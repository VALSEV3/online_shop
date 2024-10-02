import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { RatingService } from './rating.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cards: Card[];
 private basket: Card[]=[];

  constructor(private ratingService: RatingService) {
    this.cards = [
      { id: 1, description: 'Energy drink Boom Best very sweet', title: 'Boom Best', img: 'boom.jpg', price: '0.5$', rating: this.ratingService.getRating(1), added: false,
        btnText: 'Add to basket',
        backgroundColor: '#0d6efd'},
      { id: 2, description: 'Carbonated drink with high caffeine content', title: 'Max Power', img: 'max.jpg', price: '0.55$', rating: this.ratingService.getRating(2) , added: false,
        btnText: 'Add to basket',
        backgroundColor: '#0d6efd'},
      { id: 3, description: 'Adrenalin Rush is not just a drink', title: 'Adrenaline', img: 'adrenaline.jpg', price: '1$', rating: this.ratingService.getRating(3), added: false,
        btnText: 'Add to basket',
        backgroundColor: '#0d6efd' },
      { id: 4, description: 'Monster Energy OG is a smooth', title: 'Monster', img: 'monster.webp', price: '1.5$', rating: this.ratingService.getRating(4), added: false,
  btnText: 'Add to basket',
  backgroundColor: '#0d6efd'  },
      { id: 5, description: 'Red Bull Energy Drink', title: 'Red Bull', img: 'redbull.jpg', price: '1.99$', rating: this.ratingService.getRating(5), added: false,
  btnText: 'Add to basket',
  backgroundColor: '#0d6efd'  },
      { id: 6, description: 'Non-alcoholic carbonated classic energy drink.', title: 'Lit Energy', img: 'litenergy.jpg', price: '2$', rating: this.ratingService.getRating(6), added: false,
  btnText: 'Add to basket',
  backgroundColor: '#0d6efd'  },
      { id: 7, description: 'Burn is a non-alcoholic energy drink produced by Monster Beverage', title: 'Burn', img: 'burn.jpg', price: '2.11$', rating: this.ratingService.getRating(7), added: false,
  btnText: 'Add to basket',
  backgroundColor: '#0d6efd'  },
      { id: 8, description: 'Prime Ice Pop Zero Sugar 200mg Caffeine 355mg Electrolytes', title: 'Prime', img: 'prime.webp', price: '4$', rating: this.ratingService.getRating(8), added: false,
  btnText: 'Add to basket',
  backgroundColor: '#0d6efd'  },
      { id: 9, description: 'Energy drink with taurine and caffeine', title: 'Flash', img: 'flash.jpg', price: '1.154$', rating: this.ratingService.getRating(9), added: false,
  btnText: 'Add to basket',
  backgroundColor: '#0d6efd'  }
    ];
    const savedCards = localStorage.getItem('card');
    if (savedCards) {
      this.cards = JSON.parse(savedCards);
    }
    const savedBasket= localStorage.getItem('basket')
     if (savedBasket) {
      this.basket = JSON.parse(savedBasket);
    }
  }

  getCards(): Card[] {
    return this.cards;
  }

  getBasket(): Card[] {
   return this.basket
  }

  // Update all cards and persist them in local storage
  setCards(): void {
    localStorage.setItem('card', JSON.stringify(this.cards));
  }

  setBasket()
  {
  localStorage.setItem('basket', JSON.stringify(this.basket));
  }

  addToBasket(card: Card): void {
    if (!card.added) {
      card.added = true;
      card.btnText = 'Added to basket';
      card.backgroundColor = 'grey';
      this.basket.push(card)
      this.setBasket();
      this.setCards();
    }
  }


  removeFromBasket(card: Card): void {
    const index = this.basket.findIndex(b => b.id === card.id); // Find the index of the card in the basket
    if (index !== -1) {
        this.basket.splice(index, 1); // Remove the card from the basket
        card.added = false;
        card.btnText = 'Add to basket';
        card.backgroundColor = '#0d6efd';
        this.setBasket();
        this.setCards(); // Save to localStorage
    }
}


removeAllFromBasket() {
  const isConfirmed = confirm('Are you sure you want to delete all items from the basket?');

  if (isConfirmed) {
      this.cards.forEach(card => {
          card.added = false;
          card.btnText = 'Add to basket';
          card.backgroundColor = '#0d6efd';
          this.basket = [];
      });

    // Clear the basket

      this.setCards();
      this.setBasket(); // Call the method to save changes
  }
}

  }
