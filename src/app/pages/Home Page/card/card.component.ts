import { CardService } from './../../../services/card.service';
import { Component, Input } from '@angular/core';
import { Card } from '../../../models/card';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { RouterLink,RouterLinkActive,RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, NgIf, NgStyle,RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card!: Card;
  constructor(public cardService:CardService){}

}
