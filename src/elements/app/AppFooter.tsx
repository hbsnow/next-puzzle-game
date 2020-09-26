import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import { updatePokemons } from "../../store/userSlice";
import { updatePokemonBox } from "../../utils/pokemon";

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

  return (
    <div style={{ position: "fixed", bottom: 0, right: 0 }}>
      <div>{user?.userId}</div>
      <button onClick={clickHandler}>submit</button>
    </div>
  );
};
