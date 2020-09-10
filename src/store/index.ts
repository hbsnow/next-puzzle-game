import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import pokemons, { pokemonsInitialState } from "./pokemonsSlice";
import user, { userInitialState } from "./userSlice";

export type RootState = ReturnType<typeof rootReducer>;

export const rootInitialState: RootState = {
  user: userInitialState,
  pokemons: pokemonsInitialState,
};

const rootReducer = combineReducers({
  user,
  pokemons,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
