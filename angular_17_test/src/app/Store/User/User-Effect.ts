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

import { getAllUserInfo, saveAllUserInfoOnStore } from './User_Store';
import { UserService } from '../../services/user/user.service';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private store: Store,
    private userService: UserService
  ) {}

  GetAllusers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllUserInfo),
      mergeMap((action: any) => {
        this.store.dispatch(loadingStart());
        return this.userService.getAllusers(action.search).pipe(
          map((res: any) => {
            console.log(res);
            this.store.dispatch(loadingEnd());
            this.store.dispatch(
              saveAllUserInfoOnStore({ usersData: res.data })
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
