import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { getuserDataSelector } from '../../Store/Auth/Auth-Store';
import { Store, select } from '@ngrx/store';
import { userTypes } from '../../../Types/UserTypes';
import { UserDropDownComponent } from '../../reusable_components/user-drop-down/user-drop-down.component';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  template: `
    <nav
      class="bg-red-600 w-full h-16 flex items-center justify-between px-4 relative"
    >
      <a
        routerLink="/"
        class="text-white text-lg font-semibold hover:text-gray-300"
        >Home</a
      >
      @if( userData && userData.userName ) {

      <div
        (click)="dropDownHandle()"
        class="text-white absolute right-2 text-lg font-semibold hover:text-gray-300"
      >
        User: {{ userData.userName }}
      </div>
      @if (dropDown) {
      <app-user-drop-down [userName]="userData.userName"></app-user-drop-down>
      } } @else{
      <div class="flex gap-2">
        <a
          routerLink="signin"
          class="text-white text-lg font-semibold hover:text-gray-300"
          >Sign In</a
        >
        <a
          routerLink="signup"
          class="text-white text-lg font-semibold hover:text-gray-300"
          >Sign Up</a
        >
      </div>
      }
    </nav>
  `,
  // templateUrl:
  styleUrl: './nav.component.css',
  imports: [CommonModule, RouterLink, UserDropDownComponent],
})
export class NavComponent {
  userDataSelector$!: Observable<any>;
  userData: userTypes = {};
  dropDown: boolean = false;
  constructor(private store: Store, private router: Router) {
    this.userDataSelector$ = this.store.pipe(select(getuserDataSelector));
  }

  ngOnInit() {
    this.userDataSelector$.pipe().subscribe((result) => {
      this.userData = result;
      console.log(result);
    });
  }

  dropDownHandle() {
    this.dropDown = !this.dropDown;
  }
}
