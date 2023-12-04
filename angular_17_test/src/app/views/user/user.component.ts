import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import {
  getAllUserInfo,
  getManyUsersDataSelector,
} from '../../Store/User/User_Store';
import { Observable } from 'rxjs';
import { getuserDataSelector } from '../../Store/Auth/Auth-Store';
import { FormsModule } from '@angular/forms';
import { authorizedUserType } from '../../../Types/UserTypes';
import { ChatComponent } from '../../reusable_components/chat/chat.component';
import { GetAllmessagesTrigger } from '../../Store/Chat/Chat-Store';

@Component({
  selector: 'app-user',
  standalone: true,
  template: `<div class="flex">
    <div>
      <p>Hello, {{ UserData.userName }}!</p>
      <div
        class="flex flex-col p-4 bg-gray-100 rounded-md w-[300px] rounded-md max-h-[500px] overflow-y-scroll"
      >
        <div>
          <input [(ngModel)]="searchQuery" />
          <button (click)="onSearchSubmit()">Search</button>
        </div>
        <h1 clasa="text-2xl font-semibold mb-4">Connect to other users</h1>
        @for (user of usersData; track user.id) {
        <p
          (click)="choseToChat(user.id)"
          class="text-lg cursor-pointer text-gray-400 hover:text-blue-500"
        >
          {{ user.userName }}
        </p>
        } @empty { Empty list of users }
      </div>
    </div>
    @if(chosenUser){
    <app-chat [user]="chosenUser"></app-chat>

    }
  </div>`,
  styleUrl: './user.component.css',
  imports: [CommonModule, FormsModule, ChatComponent],
})
export class UserComponent {
  @Input() UserData: any;
  manyUserDataSelector$!: Observable<any>;
  authorizedUserSelector$!: Observable<any>;
  authUserId: string = '';
  usersData!: authorizedUserType[];
  searchQuery = '';
  chosenUser?: authorizedUserType | any;
  constructor(private store: Store) {
    this.manyUserDataSelector$ = this.store.pipe(
      select(getManyUsersDataSelector)
    );
    this.authorizedUserSelector$ = this.store.pipe(select(getuserDataSelector));
  }
  ngOnInit(): void {
    this.store.dispatch(getAllUserInfo({ search: this.searchQuery }));

    this.manyUserDataSelector$.pipe().subscribe((result) => {
      this.usersData = result;
    });

    this.authorizedUserSelector$.pipe().subscribe((result) => {
      this.authUserId = result.id;
    });
  }

  onSearchSubmit() {
    this.store.dispatch(getAllUserInfo({ search: this.searchQuery }));
  }

  choseToChat(id: string) {
    this.chosenUser = this.usersData.find(
      (val: authorizedUserType) => val.id === id
    );
    this.store.dispatch(
      GetAllmessagesTrigger({
        query: { Sender_id: this.authUserId, Receiver_id: id },
      })
    );
  }
}
