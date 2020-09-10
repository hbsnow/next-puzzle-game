import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { firestore } from "../services/firebase/client";

export const pokemonArea = [
  "カントー",
  "ジョウト",
  "ホウエン",
  "シンオウ",
  "イッシュ",
  "カロス",
  "アローラ",
  "ガラル",
] as const;

export const exceptPokemonArea = [pokemonArea[5]] as const;

export type PokemonType = {
  no: number;
  name: string;
  area: number;
};

export type PokemonsState = {
  pokemons: PokemonType[];
};

export const pokemonsInitialState: PokemonsState = {
  pokemons: [],
};

export const getAllPokemons = createAsyncThunk(
  "pokemons/getAllPokemons",
  async () => {
    const doc = firestore.doc(`public/v1/master/pokemons`);
    const querySnapshot = await doc.get();

    if (querySnapshot.exists) {
      return querySnapshot.data() as PokemonType[];
    }

    return [];
  }
);

const slice = createSlice({
  name: "pokemons",
  initialState: pokemonsInitialState,
  reducers: {
    setPokemons: (state, action: PayloadAction<PokemonsState["pokemons"]>) => {
      return {
        ...state,
        pokemons: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPokemons.fulfilled, (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        pokemons: action.payload,
      };
    });
  },
});

export const { setPokemons } = slice.actions;

export default slice.reducer;
