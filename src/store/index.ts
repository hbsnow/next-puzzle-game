import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";

import user, { userInitialState } from "./userSlice";

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const rootInitialState: RootState = {
  user: userInitialState,
};

const rootReducer = combineReducers({
  user,
});

const store = configureStore({ reducer: rootReducer });

export default store;
