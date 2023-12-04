import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffect } from './Store/Auth/Auth-Effect';
import { provideHttpClient } from '@angular/common/http';
import { AuthReducer } from './Store/Auth/Auth-Store';
import { UserEffect } from './Store/User/User-Effect';
import { UserReducer } from './Store/User/User_Store';
import { ChatEffect } from './Store/Chat/Chat-Effect';
import { ChatReducer } from './Store/Chat/Chat-Store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideEffects(AuthEffect, UserEffect, ChatEffect),
    provideHttpClient(),
    provideStore({
      userSelector: AuthReducer,
      manyuserSelector: UserReducer,
      chatSelector: ChatReducer,
    }),
  ],
};
