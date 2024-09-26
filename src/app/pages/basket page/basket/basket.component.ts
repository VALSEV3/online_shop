import { Component,DoCheck} from '@angular/core';
import { HeaderComponent } from '../../../header/header.component';
import { CardService } from '../../../services/card.service';
import { Card } from '../../../models/card';
import { NgFor ,NgIf} from '@angular/common';
import { CardComponent } from '../../Home Page/card/card.component';
@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [HeaderComponent,NgFor,CardComponent,NgIf],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent implements DoCheck{
basket:Card[]=[];

constructor(public cardService:CardService){}

ngDoCheck(): void {
    this.basket=this.cardService.getBasket()
}
}
