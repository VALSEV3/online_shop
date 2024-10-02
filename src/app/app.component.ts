import { Component } from '@angular/core';
import { HomeComponent } from './pages/Home Page/home/home.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent,RouterOutlet,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'online_shop';

}
