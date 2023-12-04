import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
// STATE
export const initialState = {
  messageData: [],
};

// ACTIONS

export const GetAllmessagesTrigger = createAction(
  '[get all messegeys]get all msg',
  props<{ query: any }>()
);

export const GetAllMessagesToStore = createAction(
  '[get all messages to store]get all to store',
  props<{ messageData: any }>()
);

// REDUCER

const _ChatRedcuer = createReducer(
  initialState,
  on(GetAllMessagesToStore, (state, action) => {
    return { ...state, messageData: action.messageData };
  })
);

export function ChatReducer(state: any, action: any) {
  return _ChatRedcuer(state, action);
}

// SELECTOR

export const chatSelector = createFeatureSelector<any>('chatSelector');

export const getAllChatsSelector = createSelector(chatSelector, (state) => {
  return state.messageData;
});
