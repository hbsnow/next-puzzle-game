import React, { SyntheticEvent } from "react";

import { useSelector } from "react-redux";
import styled from "styled-components";

import { RootState } from "../../store";
import { PokemonType } from "../../store/pokemonsSlice";

type ContainerProps = {
  pokemon: PokemonType;
  selectedArea: PokemonType["area"];
  changeAmount: (data: SyntheticEvent<HTMLInputElement>) => void;
};

type Props = {
  className?: string;
  defaultValue: number;
} & Omit<ContainerProps, "selectedArea">;

const Component: React.FC<Props> = (props) => {
  const { className, pokemon, defaultValue, changeAmount } = props;

  return (
    <div className={className}>
      <div className={`${className}__name`}>{pokemon.name}</div>
      <div>
        <input
          type="number"
          min={0}
          inputMode="decimal"
          name={`${pokemon.no}`}
          defaultValue={defaultValue}
          onChange={changeAmount}
        />
      </div>
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: grid;
  grid-template-columns: 5rem 1fr;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  &__name {
    font-size: 0.875rem;
  }
`;

export const PokemonBoxTableRow: React.FC<ContainerProps> = ({
  selectedArea,
  ...rest
}) => {
  const { user } = useSelector((state: RootState) => state.user);

  if (selectedArea !== rest.pokemon.area) {
    return null;
  }

  return (
    <StyledComponent
      defaultValue={user?.pokemons?.default?.[rest.pokemon.no] ?? 0}
      {...rest}
    />
  );
};
