import React from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { RootState } from "../../store";
import { updatePokemons } from "../../store/userSlice";
import { updatePokemonBox } from "../../utils/pokemon";

type Props = {
  className?: string;
  clickHandler: () => void;
};

const Component: React.FC<Props> = ({ className, clickHandler }) => {
  return (
    <div className={className}>
      <button onClick={clickHandler}>submit</button>
    </div>
  );
};

const StyledComponent = styled(Component)`
  position: sticky;
  bottom: 0;
`;

export const AppFooter: React.FC = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);
  const { changedPokemons } = useSelector((state: RootState) => state.pokemons);

  const clickHandler = () => {
    if (!changedPokemons || !user?.pokemons) {
      return;
    }

    let updateData = user.pokemons;
    for (const changedPokemon of changedPokemons) {
      updateData = updatePokemonBox(updateData, changedPokemon);
    }

    dispatch(
      updatePokemons({
        uid: user.userId,
        updateData: { pokemons: updateData },
      })
    );
  };

  return <StyledComponent clickHandler={clickHandler} />;
};
