import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  user?: {
    displayName: NonNullable<firebase.UserInfo["displayName"]>;
    photoURL: NonNullable<firebase.UserInfo["photoURL"]>;
  };
};

export const userInitialState: UserState = {
  user: undefined,
};

const toUser = (user: firebase.User): UserState["user"] => {
  return {
    displayName: user.displayName ?? "未設定",
    photoURL: user.photoURL ?? "https://example.com",
  };
};

const slice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<firebase.User>) => {
      return {
        ...state,
        user: toUser(action.payload),
      };
    },
    clearUser: (state) => {
      return {
        ...state,
        user: undefined,
      };
    },
  },
});

export const { setUser, clearUser } = slice.actions;

export default slice.reducer;
