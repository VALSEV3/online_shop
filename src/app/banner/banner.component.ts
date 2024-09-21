import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-banner',
  standalone: true,
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
  imports: [CommonModule],
})
export class BannerComponent {
  images = ["banner.jpg", "banner2.jpg"];
  imgIndex = 0;



  nextImg() {
    if (this.imgIndex < this.images.length - 1) {
      this.imgIndex++;
    } else {
      this.imgIndex = 0;
    }
  }

  prevImg() {
    if (this.imgIndex > 0) {
      this.imgIndex--;
    } else {
      this.imgIndex = this.images.length - 1;
    }
  }
}

