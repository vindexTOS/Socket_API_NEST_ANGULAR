import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { authorizedUserType } from '../../../Types/UserTypes';
import { Injectable } from '@angular/core';
import { SocketService } from '../../services/socketService/socket.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getuserDataSelector } from '../../Store/Auth/Auth-Store';
import { getAllChatsSelector } from '../../Store/Chat/Chat-Store';
import { FormsModule } from '@angular/forms';
import { UiServiceService } from '../../services/uiServics/ui-service.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<div class="bg-gray-300 p-4">
    <h1>You are speaking to {{ user.userName }}</h1>
    <div
      #chatContainer
      class="max-h-[500px] overflow-y-scroll gap-2 flex flex-col"
    >
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

    <div class="flex mt-4">
      <textarea
        [(ngModel)]="message"
        class="flex-1 p-2 border rounded-md"
        placeholder="Start Chatting"
        name="message"
      ></textarea>
      <button
        (click)="sendMessage()"
        class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Send Message
      </button>
    </div>
  </div> `,
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  @Input() user: authorizedUserType = {
    userName: 'user',
    id: 'id',
  };
  message: string = '';
  loggedInUserInfo$!: Observable<any>;
  allChatInfo$!: Observable<any>;
  Sender_id = ''; // ID from local storage by authenticated user
  ChatData: any = [];
  console: any;
  constructor(
    private socketService: SocketService,
    private store: Store,
    private uiServices: UiServiceService,
    private cdRef: ChangeDetectorRef
  ) {
    this.loggedInUserInfo$ = this.store.pipe(select(getuserDataSelector));
    this.allChatInfo$ = this.store.pipe(select(getAllChatsSelector));
  }
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  ngAfterViewInit() {
    this.cdRef.detectChanges(); // Trigger change detection
    setTimeout(() => {
      this.uiServices.scrollToBottom(this.chatContainer);
    }, 0);
  }
  testLog(log: any) {
    console.log(log);
  }

  // Function to scroll to the bottom of the chat container

  ngOnInit(): void {
    setTimeout(() => {
      this.uiServices.scrollToBottom(this.chatContainer);
    }, 1000);
    // getting logged in users info
    this.loggedInUserInfo$.pipe().subscribe((result) => {
      this.Sender_id = result.id;
    });
    this.allChatInfo$.pipe().subscribe((result) => {
      this.ChatData = result;
    });
    // Example: Emit a 'message' event
    // this.socketService.emit('newMessage', 'Hello, server!');

    // Example: Listen for 'newMessage' event
    this.socketService.onEvent('onMessage').subscribe((data) => {
      console.log(data);
      this.ChatData = [...this.ChatData, data.content];
      console.log(this.ChatData);
      this.uiServices.scrollToBottom(this.chatContainer);
    });
  }

  sendMessage(): void {
    if (this.message) {
      this.socketService.emit('newMessage', {
        Sender_id: this.Sender_id,
        Receiver_id: this.user.id,
        message: this.message,
        partyMembers: [this.Sender_id, this.user.id],
      });
      this.message = '';
      this.uiServices.scrollToBottom(this.chatContainer);
      this.uiServices.scrollToBottom(this.chatContainer);
      this.uiServices.scrollToBottom(this.chatContainer);
    }
  }
}
