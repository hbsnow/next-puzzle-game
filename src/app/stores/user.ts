import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "auth0";

export type State = {
  user?: UserData;
};

const initialState: State = {
  user: undefined,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      return Object.assign({}, state, { user: action.payload });
    },
    clearUser: (state) => {
      return Object.assign({}, state, { user: undefined });
    },
    // etc...
  },
});

export const { setUser, clearUser } = slice.actions;

export default slice.reducer;
