import React, { useMemo } from "react";

import styled from "styled-components";

import { pokemonAreas, PokemonType } from "../../store/pokemonsSlice";

type ContainerProps = {
  pokemonArea: typeof pokemonAreas[number];
  selectedAreas: PokemonType["area"][];
  switchArea: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
};

type Props = {
  className?: string;
  checked: boolean;
} & Omit<ContainerProps, "selectedAreas">;

const Component: React.FC<Props> = (props) => {
  const { className, pokemonArea, checked, switchArea } = props;

  return (
    <button
      className={className}
      value={pokemonArea.value}
      role="switch"
      aria-checked={checked}
      onClick={switchArea}
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
  border: 1px solid #999;
  color: #999;
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
  selectedAreas,
  ...rest
}) => {
  const checked = useMemo(() => {
    return selectedAreas.some(
      (selectedArea) => selectedArea === rest.pokemonArea.value
    );
  }, [rest.pokemonArea.value, selectedAreas]);

  return <StyledComponent checked={checked} {...rest} />;
};
