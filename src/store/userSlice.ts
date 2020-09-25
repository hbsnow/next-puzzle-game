import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import firebase from "firebase";

import { firestore } from "../services/firebase/client";
import { PokemonBoxType } from "../types/pokemon";

export type UserState = {
  user?: {
    userId: string;
    pokemons: PokemonBoxType[];
    createdAt: firebase.firestore.FieldValue;
    updatedAt: firebase.firestore.FieldValue;
  };
  updatePokemonsLoading: boolean;
  updatePokemonsError?: SerializedError;
};

export const userInitialState: UserState = {
  user: undefined,
  updatePokemonsLoading: false,
  updatePokemonsError: undefined,
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
    const doc = getUserDoc(uid);
    await doc.update(updateData);
  }
);

const slice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updatePokemons.pending, (state) => {
      state.updatePokemonsLoading = true;
    });
    builder.addCase(updatePokemons.fulfilled, (state) => {
      state.updatePokemonsLoading = false;
    });
    builder.addCase(updatePokemons.rejected, (state, action) => {
      state.updatePokemonsLoading = false;
      state.updatePokemonsError = action.error;
    });
  },
});

export const { setUser, clearUser } = slice.actions;

export default slice.reducer;
