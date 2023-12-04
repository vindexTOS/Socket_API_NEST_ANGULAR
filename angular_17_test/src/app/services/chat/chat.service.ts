import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllChatMessages(query: { Sender_id: string; Receiver_id: string }) {
    const { Sender_id, Receiver_id } = query;

    return this.http.get(
      `${this.baseUrl}user/chat?Receiver_id=${Receiver_id}&Sender_id=${Sender_id}`
    );
  }
}
