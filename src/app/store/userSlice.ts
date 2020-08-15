import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "auth0";

export type UserState = {
  payload?: UserData;
};

export const userInitialState: UserState = {
  payload: undefined,
};

const slice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["payload"]>) => {
      return {
        ...state,
        payload: action.payload,
      };
    },
    clearUser: (state) => {
      return {
        ...state,
        payload: undefined,
      };
    },
  },
});

export const { setUser, clearUser } = slice.actions;

export default slice.reducer;
