import React from "react";

import styled from "styled-components";

import { PokemonsState } from "../../store/pokemonsSlice";
import { PokemonBoxType } from "../../types/pokemon";
import { UserPokemonBoxTableRow } from "./UserPokemonBoxTableRow";

type ContainerProps = {
  master: PokemonsState["master"];
  pokemons?: PokemonBoxType[];
};

type Props = {
  className?: string;
} & ContainerProps;

const Component: React.FC<Props> = ({ className, master, pokemons }) => {
  return (
    <div className={className}>
      {pokemons?.map((pokemon) => {
        return (
          <UserPokemonBoxTableRow
            key={`${pokemon.area}-${pokemon.no}`}
            master={master}
            pokemon={pokemon}
          />
        );
      })}
    </div>
  );
};

const StyledComponent = styled(Component)``;

export const UserPokemonBoxTable: React.FC<ContainerProps> = (props) => {
  return <StyledComponent {...props} />;
};
