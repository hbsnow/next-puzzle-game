import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  userInfo?: {
    displayName: NonNullable<firebase.UserInfo["displayName"]>;
    photoURL: NonNullable<firebase.UserInfo["photoURL"]>;
  };
};

export const userInitialState: UserState = {
  userInfo: undefined,
};

const toUserInfo = (user: firebase.User): UserState["userInfo"] => {
  return {
    displayName: user.displayName ?? "名称未設定",
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
        userInfo: toUserInfo(action.payload),
      };
    },
    clearUser: (state) => {
      return {
        ...state,
        userInfo: undefined,
      };
    },
  },
});

export const { setUser, clearUser } = slice.actions;

export default slice.reducer;
