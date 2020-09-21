import React, { useState } from "react";

import styled from "styled-components";

import { PokemonType } from "../../store/pokemonsSlice";
import { PokemonBoxButtonList } from "./PokemonBoxButtonList";
import { PokemonBoxTable } from "./PokemonBoxTable";

type ContainerProps = {
  selectedArea: PokemonType["area"];
  setSelectedArea: React.Dispatch<React.SetStateAction<PokemonType["area"]>>;
};

type Props = {
  className?: string;
} & ContainerProps;

const Component: React.FC<Props> = (props) => {
  const { className, selectedArea, setSelectedArea } = props;

  return (
    <div className={className}>
      <PokemonBoxButtonList
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
      />

      <PokemonBoxTable selectedArea={selectedArea} />
    </div>
  );
};

const StyledComponent = styled(Component)``;

export const PokemonBox: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState(0);

  return (
    <StyledComponent
      selectedArea={selectedArea}
      setSelectedArea={setSelectedArea}
    />
  );
};
