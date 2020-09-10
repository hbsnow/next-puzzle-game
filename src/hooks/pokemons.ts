import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import { getAllPokemons } from "../store/pokemonsSlice";

export const usePokemons = () => {
  const dispatch = useDispatch();
  const { pokemons } = useSelector((state: RootState) => state.pokemons);

  useEffect(() => {
    if (!pokemons) {
      dispatch(getAllPokemons());
    }
  }, [dispatch, pokemons]);

  return { pokemons };
};
