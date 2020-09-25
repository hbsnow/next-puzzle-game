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
};

export const pokemonsInitialState: PokemonsState = {
  master: undefined,
  changedPokemons: [],
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

const slice = createSlice({
  name: "pokemons",
  initialState: pokemonsInitialState,
  reducers: {
    setChangedPokemons: (state, action: PayloadAction<PokemonBoxType>) => {
      state.changedPokemons = [action.payload];
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
  },
});

export const { setChangedPokemons } = slice.actions;

export default slice.reducer;
