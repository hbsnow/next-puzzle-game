import React, { SyntheticEvent, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { RootState } from "../../store";
import { setChangedPokemons } from "../../store/pokemonsSlice";
import { PokemonType } from "../../types/pokemon";
import { updatePokemonBox } from "../../utils/pokemon";

type ContainerProps = {
  pokemon: PokemonType;
};

type Props = {
  className?: string;
  name: PokemonType["name"];
  initialAmount: number;
  changeAmount: (data: SyntheticEvent<HTMLInputElement>) => void;
} & Omit<ContainerProps, "pokemon">;

const Component: React.FC<Props> = (props) => {
  const { className, name, initialAmount, changeAmount } = props;

  return (
    <div className={className}>
      <div className={`${className}__name`}>{name}</div>
      <div>
        <input
          type="number"
          min={0}
          inputMode="decimal"
          defaultValue={initialAmount}
          onChange={changeAmount}
        />
      </div>
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: grid;
  grid-template-columns: 6rem 1fr;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  &__name {
    font-size: 0.875rem;
  }
`;

export const PokemonBoxTableRow: React.FC<ContainerProps> = ({
  pokemon,
  ...rest
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { changedPokemons } = useSelector((state: RootState) => state.pokemons);

  const changeAmount = (data: SyntheticEvent<HTMLInputElement>) => {
    const target = data.currentTarget;
    const amount = parseInt(target.value);

    if (!Number.isFinite(amount)) {
      return;
    }

    const pokemons = updatePokemonBox(changedPokemons, {
      no: pokemon.no,
      area: pokemon.area,
      amount,
    });

    dispatch(setChangedPokemons(pokemons));
  };

  const initialAmount = useMemo(() => {
    const currentPokemon = user?.pokemons.filter((userPokemon) => {
      return userPokemon.no === pokemon.no && userPokemon.area === pokemon.area;
    });

    if (!currentPokemon || !currentPokemon.length) {
      return 0;
    }

    return currentPokemon[0].amount;
  }, [pokemon.area, pokemon.no, user?.pokemons]);

  return (
    <StyledComponent
      name={pokemon.name}
      initialAmount={initialAmount}
      changeAmount={changeAmount}
      {...rest}
    />
  );
};
