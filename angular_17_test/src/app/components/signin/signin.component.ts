import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getUserInfoForLogIn } from '../../Store/Auth/Auth-Store';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],

  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  constructor(private store: Store, private authService: AuthService) {}
  userData = {
    userName: '',
    password: '',
  };

  SubmitHandler() {
    this.store.dispatch(getUserInfoForLogIn({ userInfo: this.userData }));
  }
}
