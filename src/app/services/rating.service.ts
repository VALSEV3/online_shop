import { Injectable } from '@angular/core';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
 

  constructor() {}

  initialize(card: Card) {
    const savedRating = localStorage.getItem(`rating_${card.id}`);
    if (savedRating) {
      card.rating = +savedRating; // Преобразование в число
    }
  }

  setRating(cardId: number, rating: number) {
    localStorage.setItem(`rating_${cardId}`, rating.toString()); // Сохранение рейтинга в LocalStorage
  }

  getRating(cardId: number): number {
    const savedRating = localStorage.getItem(`rating_${cardId}`);
    return savedRating ? +savedRating : 0; // Возвращаем сохраненный рейтинг или 0
  }
}
