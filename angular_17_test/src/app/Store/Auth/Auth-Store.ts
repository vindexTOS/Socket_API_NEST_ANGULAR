import { userTypes } from '../../../Types/UserTypes';
import { createAction, props, createReducer, on } from '@ngrx/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
// INITIAL STATE
export interface InitialAuthStateType {
  token: string;
  userData: userTypes | {};
}

export const initialAuthState: InitialAuthStateType = {
  token: '',
  userData: {},
};

// ACTIONS

export const getUserInfoForRegistration = createAction(
  '[sign up user info]sing up user',
  props<{ userInfo: userTypes }>()
);
export const getUserInfoForLogIn = createAction(
  '[log in user info]login user',
  props<{ userInfo: userTypes }>()
);
export const getUsertoken = createAction(
  '[get user token] get token',
  props<{ token: string }>()
);

export const getUserdata = createAction(
  '[get user data]get user',
  props<{ userData: userTypes }>()
);

//  REDUCERS

const _AuthReducer = createReducer(
  initialAuthState,
  on(getUsertoken, (state, action) => {
    return { ...state, token: action.token };
  }),
  on(getUserdata, (state, action) => {
    return { ...state, userData: action.userData };
  })
);

export function AuthReducer(state: any, action: any) {
  return _AuthReducer(state, action);
}

//  SELECTOR

export const userDataSelector = createFeatureSelector<any>('userSelector');

export const getuserDataSelector = createSelector(userDataSelector, (state) => {
  return state.userData;
});
