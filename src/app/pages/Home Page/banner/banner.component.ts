import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  imports: [CommonModule],
})
export class BannerComponent implements OnInit {
  images = [ 'banner2.jpg','banner.jpg','banner3.jpeg','banner4.jpg'];
  imgIndex = 0;
  mouseover = false;
  intervalId: any;

  ngOnInit() {
    this.startImageRotation();
  }

  startImageRotation() {
    this.intervalId = setInterval(() => {
      this.nextImg();
    }, 2500);
  }

  pauseRotation() {
    this.mouseover = true;
    clearInterval(this.intervalId);
  }

  resumeRotation() {
    this.mouseover = false;
    this.startImageRotation();
  }

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
