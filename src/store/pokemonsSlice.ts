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
  master?: {
    default: PokemonType[];
  };
};

export const pokemonsInitialState: PokemonsState = {
  master: undefined,
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
    setPokemons: (state, action: PayloadAction<PokemonsState["master"]>) => {
      return {
        ...state,
        master: action.payload,
      };
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

export const { setPokemons } = slice.actions;

export default slice.reducer;
