export type PokemonType = {
  no: number;
  name: string;
  area: number;
};

export type CategorizedPokemonType<T> = {
  data: T;
};

export type PokemonBoxType = {
  amount: number;
} & Pick<PokemonType, "no" | "area">;
