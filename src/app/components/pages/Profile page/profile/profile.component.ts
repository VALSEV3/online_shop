import { Component } from '@angular/core';
import { HeaderComponent } from '../../../header/header.component';
import { AuthService } from '../../../../services/auth.service';
import { NgIf } from '@angular/common';
import { PopupComponent } from '../../../popup/popup.component';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent,NgIf,PopupComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user:any;

constructor(public authService:AuthService){
this.authService.getUser().subscribe(user=>{
  this.user=user
    })
  }

}
