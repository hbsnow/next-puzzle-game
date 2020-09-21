import React, { SyntheticEvent, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { RootState } from "../../store";
import {
  getAllPokemons,
  PokemonType,
  setChangedPokemons,
} from "../../store/pokemonsSlice";
import { UserState } from "../../store/userSlice";
import { PokemonBoxTableRow } from "./PokemonBoxTableRow";

type ContainerProps = {
  selectedArea: PokemonType["area"];
};

type Props = {
  className?: string;
  pokemons: PokemonType[];
  changeAmount: (data: SyntheticEvent<HTMLInputElement>) => void;
} & ContainerProps;

const Component: React.FC<Props> = (props) => {
  const { className, pokemons, selectedArea, changeAmount } = props;

  return (
    <div className={className}>
      {pokemons.map((pokemon) => {
        return (
          <div key={pokemon.no}>
            <PokemonBoxTableRow
              changeAmount={changeAmount}
              pokemon={pokemon}
              selectedArea={selectedArea}
            />
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

  const [pokemons, setPokemons] = useState<
    Required<UserState>["user"]["pokemons"]
  >();

  const changeAmount = (data: SyntheticEvent<HTMLInputElement>) => {
    setPokemons({
      ...pokemons,
      ...{
        default: {
          ...pokemons?.default,
          [data.currentTarget.name]: parseInt(data.currentTarget.value),
        },
      },
    });

    dispatch(
      setChangedPokemons({
        key: "default",
        changedPokemons: {
          [data.currentTarget.name]: parseInt(data.currentTarget.value),
        },
      })
    );
  };

  useEffect(() => {
    if (!master) {
      dispatch(getAllPokemons());
    }
  }, [dispatch, master]);

  if (!master?.default) {
    return <>loading</>;
  }

  return (
    <StyledComponent
      pokemons={master.default}
      changeAmount={changeAmount}
      {...props}
    />
  );
};
