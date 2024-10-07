import { Component, DoCheck} from '@angular/core';
import { HeaderComponent } from '../../../header/header.component';
import { NgStyle, NgIf, NgFor, NgClass } from '@angular/common';
import { RatingService } from '../../../../services/rating.service';
import { CardService } from '../../../../services/card.service';
import { Card } from '../../../../models/card';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HeaderComponent, NgStyle, NgIf, NgClass, NgFor],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements DoCheck {
  cardData:any;
  public ratingService: RatingService; // Изменили на public
  public cardService:CardService
  constructor(ratingService: RatingService,cardService:CardService) {
    this.ratingService = ratingService; // Сохраняем ссылку на сервис
    this.cardService=cardService;

  }


  ngDoCheck(): void {

      if (!this.cardData) {
        this.cardData = history.state.card || null;
      }
      this.ratingService.initialize(this.cardData);
      this.cardService.setCards(); // Этот вызов можно убрать, если он дублируется
  }

  increment() {
    this.cardData.count++;
    this.cardData.btnText = this.cardData.count.toString(); // Обновляем текст кнопки
    console.log('Incremented count:', this.cardData.count);
    this.cardService.setCards(); // Сохранение изменений в LocalStorage
  }

  decrement() {
    if (this.cardData.count > 0) {
      this.cardData.count--;
      this.cardData.btnText = this.cardData.count.toString(); // Обновляем текст кнопки
      console.log('Decremented count:', this.cardData.count);
      this.cardService.setCards(); // Сохранение изменений в LocalStorage
    }
  }
 


}
