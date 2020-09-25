import React, { useEffect, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { RootState } from "../../store";
import { getAllPokemons } from "../../store/pokemonsSlice";
import { PokemonType } from "../../types/pokemon";
import { PokemonBoxTableRow } from "./PokemonBoxTableRow";

type ContainerProps = {
  selectedArea: PokemonType["area"];
};

type Props = {
  className?: string;
  pokemons: PokemonType[];
} & Omit<ContainerProps, "selectedArea">;

const Component: React.FC<Props> = (props) => {
  const { className, pokemons } = props;

  return (
    <div className={className}>
      {pokemons.map((pokemon) => {
        return (
          <div key={pokemon.no}>
            <PokemonBoxTableRow pokemon={pokemon} />
          </div>
        );
      })}
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: grid;
  gap: 0.25rem;
  padding: 0.25rem;
`;

export const PokemonBoxTable: React.FC<ContainerProps> = (props) => {
  const dispatch = useDispatch();
  const { master } = useSelector((state: RootState) => state.pokemons);

  const filteredPokemons = useMemo(() => {
    if (!master) {
      return [];
    }

    return master?.data.filter(
      (pokemon) => pokemon.area === props.selectedArea
    );
  }, [master, props.selectedArea]);

  useEffect(() => {
    if (!master) {
      dispatch(getAllPokemons());
    }
  }, [dispatch, master]);

  if (!master) {
    return <>loading</>;
  }

  return <StyledComponent pokemons={filteredPokemons} {...props} />;
};
