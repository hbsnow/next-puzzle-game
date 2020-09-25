import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import { PokemonsState } from "../../store/pokemonsSlice";
import { updatePokemons, UserState } from "../../store/userSlice";

export const AppFooter: React.FC = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);
  const { changedPokemons } = useSelector((state: RootState) => state.pokemons);

  const clickHandler = () => {
    if (!changedPokemons || !user?.pokemons) {
      return;
    }

    // 現在の所持数と差がないか判定
    const pokemons = Object.fromEntries(
      Object.entries(changedPokemons).map(([areaString, v]) => {
        const area = parseInt(areaString);
        return [
          area,
          Object.fromEntries(
            Object.entries(v).map(([noString, amount]) => {
              const no = parseInt(noString);
              return [no, amount];
            })
          ),
        ];
      })
    );

    console.log(pokemons);
    // dispatch(
    //   updatePokemons({
    //     uid: user.userId,
    //     updateData: { pokemons },
    //   })
    // );
  };

  return (
    <div style={{ position: "fixed", bottom: 0, right: 0 }}>
      <button onClick={clickHandler}>submit</button>
    </div>
  );
};
