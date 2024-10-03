import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../header/header.component';
import { BannerComponent } from '../banner/banner.component';
import { CardComponent } from '../card/card.component';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from '../../../../models/card';
import { CardService } from '../../../../services/card.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RatingService } from '../../../../services/rating.service';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [HeaderComponent, BannerComponent, CardComponent, NgFor, FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  rating = 0;
  searchText = '';
  filteredCards: Card[] = [];

  constructor(private cardService: CardService, private ratingService: RatingService) {}

  allCards: Card[] = [];
  ngOnInit() {
    this.allCards = this.cardService.getCards();

    // Загружаем рейтинг для каждой карточки
    this.allCards.forEach(card => {
      card.rating = this.ratingService.getRating(card.id);// Получаем рейтинг для каждой карточки
    });

    this.filteredCards = [...this.allCards];

    this.filteredCards = this.allCards.sort((a, b) => b.rating - a.rating); // Сортировка по убыванию рейтинга
  }


  search() {
    const searchTextLower = this.searchText.toLowerCase();

    // Если нет поискового запроса, показываем все карточки
    this.filteredCards = searchTextLower
      ? this.allCards.filter(card =>
          card.title.toLowerCase().includes(searchTextLower)
        )
      : [...this.allCards];
  }


  setRating(card: Card, rating: number) {
    this.ratingService.setRating(card.id, rating); // Сохранение рейтинга для карточки по её ID
    card.rating = rating; // Обновляем рейтинг карточки локально
  }



}
