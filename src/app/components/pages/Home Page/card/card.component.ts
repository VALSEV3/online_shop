import { CardService } from '../../../../services/card.service';
import { Component, Input,DoCheck } from '@angular/core';
import { Card } from '../../../../models/card';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, NgIf, NgStyle, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements DoCheck{
  @Input() card!: Card;
  currentRoute='';
  cardPrice='0';
  balance='0'
  public cardService: CardService
  constructor( cardService: CardService,private router:Router) {
this.cardService=cardService;

this.currentRoute = this.router.url;
this.router.events.subscribe(() => {
  this.currentRoute = this.router.url;
});

  }
  ngDoCheck(): void {
const savedBalance=localStorage.getItem('balance')
if(savedBalance){
this.balance=savedBalance;
}
      if(this.currentRoute==='/app-basket'){
        this.cardPrice=(parseFloat(this.card.price)*this.card.count+'$').toString().substring(0, 4)
      }else{
        this.cardPrice=this.card.price
      }
      this.cardService.setCards()
      this.cardService.setBasket()
  }

  increment() {
    this.card.count++;
    this.card.btnText = this.card.count.toString(); // Update btnText
    this.cardService.setCards()
    this.cardService.setBasket()
    console.log('Incremented count:', this.card.count);
  }

  decrement() {
    if (this.card.count > 0) {
      this.card.count--;
      this.card.btnText = this.card.count.toString();
      this.cardService.setCards()
      this.cardService.setBasket()
      console.log('Decremented count:', this.card.count);
    }
  }

buy(){
  const cardPrice=(parseInt(this.card.price)*this.card.count+'$').toString().substring(0, 4)
if(parseFloat(this.balance)>=parseFloat(cardPrice)){
  alert(`you buy ${this.card.count} ${this.card.title}`)
  this.balance=(parseInt(this.balance)-parseFloat(cardPrice)).toString()='$'
    localStorage.setItem('balance',this.balance)
  this.cardService.removeFromBasket(this.card)
  this.cardService.setBasket();

}
else{
alert("top up your balance");

}
}
}
