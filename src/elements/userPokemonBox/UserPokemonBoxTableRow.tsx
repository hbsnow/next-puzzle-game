import React, { useMemo } from "react";

import styled from "styled-components";

import { PokemonsState } from "../../store/pokemonsSlice";
import { PokemonBoxType } from "../../types/pokemon";
import { isEqualPokemon } from "../../utils/pokemon";

type ContainerProps = {
  master: PokemonsState["master"];
  pokemon: PokemonBoxType;
};

type Props = {
  className?: string;
  name?: string;
} & Omit<ContainerProps, "master">;

const Component: React.FC<Props> = ({ className, pokemon, name }) => {
  return (
    <div className={className}>
      {name}/{pokemon.amount}
    </div>
  );
};

const StyledComponent = styled(Component)``;

export const UserPokemonBoxTableRow: React.FC<ContainerProps> = (props) => {
  const { master, ...rest } = props;

  const name = useMemo(() => {
    const filtered = master?.data.filter((pokemon) =>
      isEqualPokemon(pokemon, props.pokemon)
    );
    return filtered && filtered[0].name;
  }, [master, props.pokemon]);

  return <StyledComponent name={name} {...rest} />;
};
