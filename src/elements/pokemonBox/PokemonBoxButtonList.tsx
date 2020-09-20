import React from "react";

import styled from "styled-components";

import { pokemonAreas, PokemonType } from "../../store/pokemonsSlice";
import { PokemonBoxButton } from "./PokemonBoxButton";

type ContainerProps = {
  selectedAreas: PokemonType["area"][];
  setSelectedAreas: React.Dispatch<React.SetStateAction<PokemonType["area"][]>>;
};

type Props = {
  className?: string;
} & ContainerProps;

const Component: React.FC<Props> = ({
  className,
  selectedAreas,
  setSelectedAreas,
}) => {
  return (
    <div className={className}>
      {pokemonAreas.map((area) => {
        return (
          <div key={area.value}>
            <PokemonBoxButton
              pokemonArea={area}
              selectedAreas={selectedAreas}
              setSelectedAreas={setSelectedAreas}
            />
          </div>
        );
      })}
    </div>
  );
};

const StyledComponent = styled(Component)``;

export const PokemonBoxButtonList: React.FC<ContainerProps> = (props) => {
  return <StyledComponent {...props} />;
};
