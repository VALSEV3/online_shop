import { Component, DoCheck} from '@angular/core';
import { HeaderComponent } from '../../../header/header.component';
import { NgStyle, NgIf, NgFor, NgClass } from '@angular/common';
import { RatingService } from '../../../../services/rating.service';
import { CardService } from '../../../../services/card.service';

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
    if (!this.cardData) {
      this.cardData = history.state.card || null;
      this.cardService.setCards()
    }
  }


  ngDoCheck(): void {
    this.cardService.setCards()
    console.log('Card Data:', this.cardData);
    this.ratingService.initialize(this.cardData);
    this.cardService.setCards()
  }


}
