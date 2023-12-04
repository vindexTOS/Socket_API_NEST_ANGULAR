import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
// Initial state
export const initialState = {
  usersData: [],
};
// ACTIONS
export const getAllUserInfo = createAction(
  '[get all user]get all user data',
  props<{ search: string }>()
);
export const saveAllUserInfoOnStore = createAction(
  '[save all user]save user info',
  props<{ usersData: any }>()
);

// REDUCER

const _UserReducer = createReducer(
  initialState,
  on(saveAllUserInfoOnStore, (state, action) => {
    return { ...state, usersData: action.usersData };
  })
);

export const UserReducer = (state: any, action: any) => {
  return _UserReducer(state, action);
};

//  SELECTOR

export const manyUsersDataSelector =
  createFeatureSelector<any>('manyuserSelector');

export const getManyUsersDataSelector = createSelector(
  manyUsersDataSelector,
  (state) => {
    return state.usersData;
  }
);
