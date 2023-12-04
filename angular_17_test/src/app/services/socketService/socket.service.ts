import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../env';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  baseUrl = environment.apiUrl;

  constructor() {
    this.socket = io(this.baseUrl);
  }

  // Emit an event
  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  // Listen for events
  onEvent(eventName: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      });
    });
  }
}
