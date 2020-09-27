import React, { useMemo } from "react";

import styled from "styled-components";

import { pokemonAreas } from "../../constants/pokemons";
import { PokemonsState } from "../../store/pokemonsSlice";
import { PokemonBoxType } from "../../types/pokemon";
import { isEqualPokemon } from "../../utils/pokemon";

type ContainerProps = {
  master: PokemonsState["master"];
  pokemon: PokemonBoxType;
};

type Props = {
  className?: string;
  areaName?: string;
  pokemonName?: string;
} & Omit<ContainerProps, "master">;

const Component: React.FC<Props> = (props) => {
  const { className, pokemon, pokemonName, areaName } = props;

  return (
    <div className={className}>
      {areaName}/{pokemonName}/{pokemon.amount}
    </div>
  );
};

const StyledComponent = styled(Component)`
  background-color: #fff;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  padding: 0.25rem;
`;

export const UserPokemonBoxTableRow: React.FC<ContainerProps> = (props) => {
  const { master, ...rest } = props;

  const pokemonName = useMemo(() => {
    const filtered = master?.data.filter((pokemon) =>
      isEqualPokemon(pokemon, props.pokemon)
    );
    return filtered && filtered[0].name;
  }, [master, props.pokemon]);

  const areaName = useMemo(() => {
    return pokemonAreas.find((area) => area.value === props.pokemon.area)?.name;
  }, [props.pokemon.area]);

  return (
    <StyledComponent pokemonName={pokemonName} areaName={areaName} {...rest} />
  );
};
