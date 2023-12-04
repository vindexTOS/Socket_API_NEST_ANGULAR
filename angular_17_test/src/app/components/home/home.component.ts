import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getuserDataSelector } from '../../Store/Auth/Auth-Store';
import { UserComponent } from '../../views/user/user.component';
import { GuestComponent } from '../../views/guest/guest.component';
import { userTypes } from '../../../Types/UserTypes';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, UserComponent, GuestComponent],
})
export class HomeComponent {
  userDataSelector$!: Observable<any>;
  userData: userTypes = {};
  token = '';
  constructor(private store: Store, private authService: AuthService) {
    this.userDataSelector$ = this.store.pipe(select(getuserDataSelector));
  }

  ngOnInit() {
    // this.userDataSelector$.pipe().subscribe((result) => {
    //   console.log(result);
    //   this.userData = result;
    // });
    this.store.select(getuserDataSelector).subscribe((state) => {
      this.userData = state;
      console.log(state);
    });
  }
}
