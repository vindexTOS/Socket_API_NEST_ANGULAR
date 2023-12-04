import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { getUserInfoForRegistration } from '../../Store/Auth/Auth-Store';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignUpComponent {
  constructor(private store: Store, private router: Router) {}
  userData = {
    userName: '',
    password: '',
    confirmation_pass: '',
  };
  SubmitHandler() {
    this.store.dispatch(
      getUserInfoForRegistration({
        userInfo: this.userData,
      })
    );
  }
}
