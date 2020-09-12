import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import firebase from "firebase";

import { firestore } from "../services/firebase/client";
import { CategorizedPokemonType } from "./pokemonsSlice";

export type UserState = {
  user?: {
    userId: string;
    pokemons?: CategorizedPokemonType<{ [key: string]: number }>;
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

// export const getPokemons = createAsyncThunk(
//   "user/getPokemons",
//   async (uid: string) => {
//     const doc = getUserDoc(uid);
//     const querySnapshot = await doc.get(); // 全部とってきちゃってる

//     if (!querySnapshot.exists) {
//       return undefined;
//     }

//     return querySnapshot.data() as UserState["pokemons"];
//   }
// );

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
