import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { RootState } from "../../store";
import { getAllPokemons, PokemonsState } from "../../store/pokemonsSlice";
import { PokemonType } from "../../types/pokemon";
import { PokemonBoxButtonList } from "./PokemonBoxButtonList";
import { PokemonBoxTable } from "./PokemonBoxTable";

type ContainerProps = {
  selectedArea: PokemonType["area"];
  setSelectedArea: React.Dispatch<React.SetStateAction<PokemonType["area"]>>;
};

type Props = {
  className?: string;
  master: Required<PokemonsState>["master"];
} & ContainerProps;

const Component: React.FC<Props> = (props) => {
  const { className, master, selectedArea, setSelectedArea } = props;

  return (
    <div className={className}>
      <div className={`${className}__area`}>
        <PokemonBoxButtonList
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
        />
      </div>

      <div>
        <PokemonBoxTable master={master} selectedArea={selectedArea} />
      </div>
    </div>
  );
};

const StyledComponent = styled(Component)`
  & > &__area {
    position: sticky;
    top: 0;
    background: #fff;
  }
`;

export const PokemonBox: React.FC = () => {
  const dispatch = useDispatch();
  const { master } = useSelector((state: RootState) => state.pokemons);
  const [selectedArea, setSelectedArea] = useState(0);

  useEffect(() => {
    if (!master) {
      dispatch(getAllPokemons());
    }
  }, [dispatch, master]);

  if (!master) {
    return <>loading</>;
  }

  return (
    <StyledComponent
      master={master}
      selectedArea={selectedArea}
      setSelectedArea={setSelectedArea}
    />
  );
};
