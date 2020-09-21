import React from "react";

import styled from "styled-components";

import { pokemonAreas, PokemonType } from "../../store/pokemonsSlice";

type ContainerProps = {
  pokemonArea: typeof pokemonAreas[number];
  selectedArea: PokemonType["area"];
  selectArea: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
};

type Props = {
  className?: string;
  checked: boolean;
} & Omit<ContainerProps, "selectedArea">;

const Component: React.FC<Props> = (props) => {
  const { className, pokemonArea, checked, selectArea } = props;

  return (
    <button
      className={className}
      value={pokemonArea.value}
      role="switch"
      aria-checked={checked}
      onClick={selectArea}
    >
      {pokemonArea.name}
    </button>
  );
};

const StyledComponent = styled(Component)`
  display: block;
  width: 100%;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  border: 1px solid transparent;
  color: #888;
  background: transparent;
  user-select: none;
  padding: 0.25rem;
  font-size: 0.75rem;
  border-radius: 0.375rem;

  &[aria-checked="true"] {
    background: #000;
  }
`;

export const PokemonBoxButton: React.FC<ContainerProps> = ({
  selectedArea,
  ...rest
}) => {
  return (
    <StyledComponent
      checked={selectedArea === rest.pokemonArea.value}
      {...rest}
    />
  );
};
