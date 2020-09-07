import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { firestore } from "../services/firebase/client";

export type UserState = {
  user?: {
    userId: string;
    createdAt: firebase.firestore.FieldValue;
    updatedAt: firebase.firestore.FieldValue;
  };
};

export const userInitialState: UserState = {
  user: undefined,
};

export const getUserRef = (
  uid: string
): firebase.firestore.DocumentReference<UserState["user"]> => {
  return firestore.doc(
    `public/v1/users/${uid}`
  ) as firebase.firestore.DocumentReference<UserState["user"]>;
};

const slice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["user"]>) => {
      return {
        ...state,
        user: action.payload,
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
