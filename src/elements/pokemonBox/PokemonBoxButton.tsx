import React, { useCallback, useMemo } from "react";

import styled from "styled-components";

import { pokemonAreas, PokemonType } from "../../store/pokemonsSlice";

type ContainerProps = {
  pokemonArea: typeof pokemonAreas[number];
  selectedAreas: PokemonType["area"][];
  setSelectedAreas: React.Dispatch<React.SetStateAction<PokemonType["area"][]>>;
};

type Props = {
  className?: string;
  checked: boolean;
  switchArea: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
} & Omit<ContainerProps, "selectedAreas" | "setSelectedAreas">;

const Component: React.FC<Props> = ({ pokemonArea, checked, switchArea }) => {
  return (
    <button value={pokemonArea.value} onClick={switchArea}>
      {checked ? "checked" : ""}
      {pokemonArea.name}
    </button>
  );
};

const StyledComponent = styled(Component)``;

export const PokemonBoxButton: React.FC<ContainerProps> = ({
  selectedAreas,
  setSelectedAreas,
  ...rest
}) => {
  const switchArea = useCallback(
    (event: React.SyntheticEvent<HTMLButtonElement>) => {
      const target = event.currentTarget;
      const value = parseInt(target.value);

      if (!selectedAreas.some((area) => area === value)) {
        selectedAreas.push(value);
      } else {
        const targetIndex = selectedAreas.findIndex((area) => area === value);
        selectedAreas.splice(targetIndex, 1);
      }

      setSelectedAreas([...selectedAreas]);
    },
    [selectedAreas, setSelectedAreas]
  );

  const checked = useMemo(() => {
    return selectedAreas.some(
      (selectedArea) => selectedArea === rest.pokemonArea.value
    );
  }, [rest.pokemonArea.value, selectedAreas]);

  return (
    <StyledComponent checked={checked} switchArea={switchArea} {...rest} />
  );
};
