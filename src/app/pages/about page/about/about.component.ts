import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../header/header.component';
import { NgStyle, NgIf, NgFor, NgClass } from '@angular/common';
import { RatingService } from '../../../services/rating.service';
import { CardService } from '../../../services/card.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HeaderComponent, NgStyle, NgIf, NgClass, NgFor],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  cardData: any;
  public ratingService: RatingService; // Изменили на public

  constructor(ratingService: RatingService,public cardService:CardService) {
    this.ratingService = ratingService; // Сохраняем ссылку на сервис
  }

  ngOnInit(): void {
    this.cardData = history.state.card;
    this.ratingService.initialize(this.cardData); // Инициализируем рейтинг
  }


}
