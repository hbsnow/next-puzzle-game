import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { firestore } from "../services/firebase/client";
import {
  CategorizedPokemonType,
  PokemonBoxType,
  PokemonType,
} from "../types/pokemon";

export type PokemonsState = {
  master?: CategorizedPokemonType<PokemonType[]>;
  changedPokemons: PokemonBoxType[];
  users?: {
    [key: string]: PokemonBoxType[];
  };
};

export const pokemonsInitialState: PokemonsState = {
  master: undefined,
  changedPokemons: [],
  users: undefined,
};

export const getAllPokemons = createAsyncThunk(
  "pokemons/getAllPokemons",
  async () => {
    const doc = firestore.doc(`public/v1/master/pokemons`);
    const querySnapshot = await doc.get();

    if (!querySnapshot.exists) {
      return undefined;
    }

    return querySnapshot.data() as PokemonsState["master"];
  }
);

export const getUserPokemons = createAsyncThunk(
  "pokemons/getUserPokemons",
  async ({ userId }: { userId: string }) => {
    const doc = firestore.doc(`public/v1/users/${userId}`);
    const querySnapshot = await doc.get();

    if (!querySnapshot.exists) {
      return undefined;
    }

    return querySnapshot.get("pokemons") as PokemonBoxType[];
  }
);

const slice = createSlice({
  name: "pokemons",
  initialState: pokemonsInitialState,
  reducers: {
    setChangedPokemons: (
      state,
      action: PayloadAction<PokemonsState["changedPokemons"]>
    ) => {
      state.changedPokemons = action.payload;
    },
    clearChangedPokemons: (state) => {
      state.changedPokemons = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPokemons.fulfilled, (state, action) => {
      return {
        ...state,
        master: action.payload,
      };
    });

    builder.addCase(getUserPokemons.fulfilled, (state, action) => {
      return {
        ...state,
        users: {
          ...state.users,
          ...{
            [action.meta.arg.userId]: action.payload ?? [],
          },
        },
      };
    });
  },
});

export const { setChangedPokemons } = slice.actions;

export default slice.reducer;
