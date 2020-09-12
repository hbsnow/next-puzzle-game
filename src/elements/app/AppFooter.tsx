import React from "react";

import { useSelector } from "react-redux";

import { RootState } from "../../store";

export const AppFooter: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { changedPokemons } = useSelector((state: RootState) => state.pokemons);

  const clickHandler = () => {
    if (!changedPokemons || !user?.pokemons) {
      return;
    }

    const filtered = Object.keys(changedPokemons.default).filter(
      (pokemonNumber) => {
        return (
          user.pokemons?.default?.[pokemonNumber] !== undefined &&
          user.pokemons.default[pokemonNumber] !==
            changedPokemons.default[pokemonNumber]
        );
      }
    );

    console.log(filtered);
  };

  return (
    <>
      <button onClick={clickHandler}>submit</button>
    </>
  );
};
