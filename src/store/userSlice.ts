import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import firebase from "firebase/app";

import { auth } from "../services/firebase/client";

export type UserState = {
  user?: {
    displayName: NonNullable<firebase.UserInfo["displayName"]>;
    photoURL: NonNullable<firebase.UserInfo["photoURL"]>;
  };
  isLoading: boolean;
  error?: SerializedError;
};

export const userInitialState: UserState = {
  user: undefined,
  isLoading: false,
  error: undefined,
};

const toUser = (user: firebase.UserInfo): UserState["user"] => {
  return {
    displayName: user.displayName ?? "未設定",
    photoURL: user.photoURL ?? "https://example.com",
  };
};

export const signInWithGoogle = createAsyncThunk(
  "user/signInWithGoogle",
  async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithRedirect(provider);
    const result = await auth.getRedirectResult();
    console.log(result);

    return result.user ? toUser(result.user) : undefined;
  }
);

export const signOut = createAsyncThunk("user/signOut", async () => {
  await auth.signOut();
});
const slice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<firebase.UserInfo>) => {
      state.user = toUser(payload);
    },
    clearUser: (state) => {
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInWithGoogle.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(signInWithGoogle.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error;
    });

    builder.addCase(signOut.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.user = undefined;
      state.isLoading = false;
    });
    builder.addCase(signOut.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error;
    });
  },
});

export const { setUser, clearUser } = slice.actions;

export default slice.reducer;
