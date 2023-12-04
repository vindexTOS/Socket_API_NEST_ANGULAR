import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authorizedUserType } from '../../../Types/UserTypes';
import { Injectable } from '@angular/core';
import { SocketService } from '../../services/socketService/socket.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getuserDataSelector } from '../../Store/Auth/Auth-Store';
import { getAllChatsSelector } from '../../Store/Chat/Chat-Store';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="bg-gray-300">
    <h1>You are speaking to {{ user.userName }}</h1>
    <div class="relative">
      @for (message of ChatData; track message.id){ @if( Sender_id == message.
      Sender_id){
      <p class=" ml-[40%] bg-green-600 text-white p-2 rounded-[5px]">
        {{ message.message }}
      </p>

      }@else {
      <p class=" mr-[40%] bg-blue-600 text-white p-2 rounded-[5px]">
        {{ message.message }}
      </p>
      } }@empty {
      <div>you do not have chat with {{ user.userName }}</div>
      }
    </div>
    <textarea>Start Chatting</textarea>
    <button (click)="sendMessage()">Send Message</button>
  </div> `,
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  @Input() user: authorizedUserType = {
    userName: 'user',
    id: 'id',
  };
  loggedInUserInfo$!: Observable<any>;
  allChatInfo$!: Observable<any>;
  Sender_id = ''; // ID from local storage by authenticated user
  ChatData: any = [];
  constructor(private socketService: SocketService, private store: Store) {
    this.loggedInUserInfo$ = this.store.pipe(select(getuserDataSelector));
    this.allChatInfo$ = this.store.pipe(select(getAllChatsSelector));
  }

  ngOnInit(): void {
    // getting logged in users info
    this.loggedInUserInfo$.pipe().subscribe((result) => {
      this.Sender_id = result.id;
    });
    this.allChatInfo$.pipe().subscribe((result) => {
      console.log(result);
      this.ChatData = result;
    });
    // Example: Emit a 'message' event
    // this.socketService.emit('newMessage', 'Hello, server!');

    // Example: Listen for 'newMessage' event
    this.socketService.onEvent('onMessage').subscribe((data) => {
      console.log(data);
      this.ChatData = [...this.ChatData, data.content];
      console.log(this.ChatData);
    });
  }

  sendMessage(): void {
    this.socketService.emit('newMessage', {
      Sender_id: this.Sender_id,
      Receiver_id: this.user.id,
      message: 'Helo',
      partyMembers: [this.Sender_id, this.user.id],
    });
  }
}
