import React, { useCallback } from "react";

import styled from "styled-components";

import { pokemonAreas, PokemonType } from "../../store/pokemonsSlice";
import { PokemonBoxButton } from "./PokemonBoxButton";

type ContainerProps = {
  selectedAreas: PokemonType["area"][];
  setSelectedAreas: React.Dispatch<React.SetStateAction<PokemonType["area"][]>>;
};

type Props = {
  className?: string;
  switchArea: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
} & Omit<ContainerProps, "setSelectedAreas">;

const Component: React.FC<Props> = ({
  className,
  selectedAreas,
  switchArea,
}) => {
  return (
    <div className={className}>
      {pokemonAreas.map((area) => {
        return (
          <div key={area.value}>
            <PokemonBoxButton
              pokemonArea={area}
              selectedAreas={selectedAreas}
              switchArea={switchArea}
            />
          </div>
        );
      })}
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, 4.5rem);
  justify-content: center;
  padding: 1rem 0.125rem;
`;

export const PokemonBoxButtonList: React.FC<ContainerProps> = ({
  setSelectedAreas,
  ...rest
}) => {
  const switchArea = useCallback(
    (event: React.SyntheticEvent<HTMLButtonElement>) => {
      const target = event.currentTarget;
      const value = parseInt(target.value);
      const selectedAreas = rest.selectedAreas;

      if (!selectedAreas.some((area) => area === value)) {
        selectedAreas.push(value);
      } else {
        const targetIndex = selectedAreas.findIndex((area) => area === value);
        selectedAreas.splice(targetIndex, 1);
      }

      setSelectedAreas([...selectedAreas]);
    },
    [rest.selectedAreas, setSelectedAreas]
  );

  return <StyledComponent switchArea={switchArea} {...rest} />;
};
