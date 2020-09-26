import React, { useMemo } from "react";

import styled from "styled-components";

import { PokemonsState } from "../../store/pokemonsSlice";
import { PokemonType } from "../../types/pokemon";
import { PokemonBoxTableRow } from "./PokemonBoxTableRow";

type ContainerProps = {
  master: Required<PokemonsState>["master"];
  selectedArea: PokemonType["area"];
};

type Props = {
  className?: string;
  pokemons: PokemonType[];
} & Omit<ContainerProps, "master" | "selectedArea">;

const Component: React.FC<Props> = (props) => {
  const { className, pokemons } = props;

  return (
    <div className={className}>
      {pokemons.map((pokemon) => {
        return (
          <div key={pokemon.no} className={`${className}__row`}>
            <PokemonBoxTableRow pokemon={pokemon} />
          </div>
        );
      })}
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
  gap: 0.25rem 0.5rem;
  padding: 0.25rem;
`;

export const PokemonBoxTable: React.FC<ContainerProps> = (props) => {
  const { master, ...rest } = props;

  const filteredPokemons = useMemo(() => {
    return master?.data.filter(
      (pokemon) => pokemon.area === props.selectedArea
    );
  }, [master, props.selectedArea]);

  return <StyledComponent pokemons={filteredPokemons} {...rest} />;
};
