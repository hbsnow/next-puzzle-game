import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { firestore } from "../services/firebase/client";

export const pokemonArea = [
  "kanto",
  "johto",
  "hoenn",
  "sinnoh",
  "unova",
  "kalos",
  "alola",
  "galar",
] as const;

export type PokemonType = {
  no: number;
  name: string;
  area: typeof pokemonArea[number][];
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
    const collections = firestore.collection(`public/v1/pokemons`);
    const querySnapshot = await collections.get();
    const pokemons: PokemonType[] = [];
    querySnapshot.forEach((doc) => {
      pokemons.push(doc.data() as PokemonType);
    });

    return pokemons;
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
