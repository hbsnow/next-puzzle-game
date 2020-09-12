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

type categorizedKeyType = "default";

export type PokemonType = {
  no: number;
  name: string;
  area: number;
};

export type CategorizedPokemonType<T> = {
  [key in categorizedKeyType]: T;
};

export type PokemonsState = {
  master?: CategorizedPokemonType<PokemonType[]>;
  changedPokemons?: CategorizedPokemonType<{ [key: string]: number }>;
};

export const pokemonsInitialState: PokemonsState = {
  master: undefined,
  changedPokemons: undefined,
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
    setChangedPokemons: (
      state,
      action: PayloadAction<{
        key: categorizedKeyType;
        changedPokemons: { [key: string]: number };
      }>
    ) => {
      if (state.changedPokemons?.[action.payload.key]) {
        state.changedPokemons[action.payload.key] = {
          ...state.changedPokemons[action.payload.key],
          ...action.payload.changedPokemons,
        };
      } else {
        state.changedPokemons = {
          [action.payload.key]: action.payload.changedPokemons,
        };
      }
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
