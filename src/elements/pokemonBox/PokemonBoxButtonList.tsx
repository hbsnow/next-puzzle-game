import React, { useCallback } from "react";

import styled from "styled-components";

import { pokemonAreas } from "../../constants/pokemons";
import { PokemonType } from "../../types/pokemon";
import { PokemonBoxButton } from "./PokemonBoxButton";

type ContainerProps = {
  selectedArea: PokemonType["area"];
  setSelectedArea: React.Dispatch<React.SetStateAction<PokemonType["area"]>>;
};

type Props = {
  className?: string;
  areas: typeof pokemonAreas;
  selectArea: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
} & Omit<ContainerProps, "setSelectedArea">;

const Component: React.FC<Props> = (props) => {
  const { className, areas, selectedArea, selectArea } = props;
  return (
    <div className={className}>
      {areas.map((area) => {
        return (
          <div key={area.value}>
            <PokemonBoxButton
              pokemonArea={area}
              selectedArea={selectedArea}
              selectArea={selectArea}
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
  border-bottom: 1px solid #000;
  padding: 0.5rem 0.125rem;
`;

export const PokemonBoxButtonList: React.FC<ContainerProps> = (props) => {
  const { setSelectedArea, ...rest } = props;

  const selectArea = useCallback(
    (event: React.SyntheticEvent<HTMLButtonElement>) => {
      const target = event.currentTarget;
      const value = parseInt(target.value);

      setSelectedArea(value);
    },
    [setSelectedArea]
  );

  return (
    <StyledComponent areas={pokemonAreas} selectArea={selectArea} {...rest} />
  );
};
