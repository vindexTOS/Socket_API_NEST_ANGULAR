import { Store } from '@ngrx/store';

import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { mergeMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadingEnd,
  loadingStart,
  statusError,
  statusSuccses,
} from '../StatusHanndle/Status.action';

import { UserService } from '../../services/user/user.service';
import { GetAllMessagesToStore, GetAllmessagesTrigger } from './Chat-Store';
import { ChatService } from '../../services/chat/chat.service';

@Injectable()
export class ChatEffect {
  constructor(
    private actions$: Actions,
    private store: Store,
    private chatService: ChatService
  ) {}

  GetAllChat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllmessagesTrigger),
      mergeMap((action: any) => {
        this.store.dispatch(loadingStart());
        return this.chatService.getAllChatMessages(action.query).pipe(
          map((res: any) => {
            console.log(res);
            this.store.dispatch(loadingEnd());
            this.store.dispatch(
              GetAllMessagesToStore({ messageData: res.data })
            );
            return statusSuccses({ succses: res.message });
          }),
          catchError((error) => {
            this.store.dispatch(loadingEnd());
            console.log(error);
            return of(statusError({ error: 'Somthing went wrong' }));
          })
        );
      })
    )
  );
}
