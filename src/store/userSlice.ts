import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import firebase from "firebase";

import { firestore } from "../services/firebase/client";
import { CategorizedPokemonType } from "./pokemonsSlice";

export type UserState = {
  user?: {
    userId: string;
    pokemons: CategorizedPokemonType<{ [key: string]: number }>;
    createdAt: firebase.firestore.FieldValue;
    updatedAt: firebase.firestore.FieldValue;
  };
};

export const userInitialState: UserState = {
  user: undefined,
};

export const getUserDoc = (
  uid: string
): firebase.firestore.DocumentReference<UserState["user"]> => {
  return firestore.doc(
    `public/v1/users/${uid}`
  ) as firebase.firestore.DocumentReference<UserState["user"]>;
};

export const updatePokemons = createAsyncThunk(
  "user/getPokemons",
  async ({
    uid,
    updateData,
  }: {
    uid: string;
    updateData: firebase.firestore.UpdateData;
  }) => {
    console.log({ uid, updateData });
    const doc = getUserDoc(uid);
    await doc.update(updateData);

    // return querySnapshot.data() as UserState["pokemons"];
  }
);

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
  // extraReducers: (builder) => {
  //   builder.addCase(getPokemons.fulfilled, (state, action) => {
  //     console.log(action.payload);
  //     return {
  //       ...state,
  //       pokemons: action.payload,
  //     };
  //   });
  // },
});

export const { setUser, clearUser } = slice.actions;

export default slice.reducer;
