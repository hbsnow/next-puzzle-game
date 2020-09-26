import { PokemonBoxType, PokemonType } from "../types/pokemon";

/**
 * 同じポケモンであれば true
 */
export function isEqualPokemon(
  a: PokemonBoxType | PokemonType,
  b: PokemonBoxType | PokemonType
): boolean {
  return a.no === b.no && a.area === b.area;
}

/**
 * 指定したポケモンがポケモンのリストに存在したら true
 */
export function existPokemonBox(
  pokemons: PokemonBoxType[],
  target: PokemonBoxType
): boolean {
  return pokemons.some((pokemon) => isEqualPokemon(pokemon, target));
}

/**
 * 指定したポケモンがポケモンのリストに存在したら上書き、なければ追加して戻す
 */
export function updatePokemonBox(
  pokemons: PokemonBoxType[],
  target: PokemonBoxType
): PokemonBoxType[] {
  if (existPokemonBox(pokemons, target)) {
    return pokemons.map((pokemon) => {
      if (isEqualPokemon(pokemon, target)) {
        return target;
      }
      return pokemon;
    });
  }

  return [...pokemons, target];
}
