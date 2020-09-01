import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import user, { userInitialState, setUser } from "./userSlice";

export type RootState = ReturnType<typeof rootReducer>;

export const rootInitialState: RootState = {
  user: userInitialState,
};

const rootReducer = combineReducers({
  user,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [setUser.type],
    },
  }),
});

export default store;
