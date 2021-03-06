import React, { SyntheticEvent, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Input } from "../../components/input/Input";
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
      <div className={`${className}__input`}>
        <Input
          type="number"
          min={0}
          inputMode="decimal"
          defaultValue={initialAmount}
          onChange={changeAmount}
          fill
        />
      </div>
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: grid;
  grid-template-columns: auto 2rem;
  align-items: center;

  & > &__name {
    font-size: 0.75rem;
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
    const currentPokemon = user?.pokemons.find((userPokemon) => {
      return userPokemon.no === pokemon.no && userPokemon.area === pokemon.area;
    });

    return currentPokemon?.amount ?? 0;
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
