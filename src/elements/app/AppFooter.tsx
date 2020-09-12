import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import { updatePokemons } from "../../store/userSlice";

export const AppFooter: React.FC = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);
  const { changedPokemons } = useSelector((state: RootState) => state.pokemons);

  const clickHandler = () => {
    if (!changedPokemons || !user?.pokemons) {
      console.log(changedPokemons);
      return;
    }
    console.log(user.pokemons, changedPokemons);

    dispatch(
      updatePokemons({
        uid: user.userId,
        updateData: {
          pokemons: {
            ...user.pokemons,
            default: {
              ...user.pokemons.default,
              ...changedPokemons.default,
            },
          },
        },
      })
    );
  };

  return (
    <>
      <button onClick={clickHandler}>submit</button>
    </>
  );
};
