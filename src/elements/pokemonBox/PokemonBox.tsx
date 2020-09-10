import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import {
  PokemonType,
  getAllPokemons,
  pokemonArea,
  exceptPokemonArea,
} from "../../store/pokemonsSlice";
import { CategorizedByArea } from "./CategorizedByArea";

export const PokemonBox: React.FC = () => {
  const [areas, setAreas] = useState<PokemonType["area"][]>([]);
  const clickTab = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    const element = event.currentTarget;
    const value = parseInt(element.value);

    if (!areas.some((area) => area === value)) {
      areas.push(value);
    } else {
      const targetIndex = areas.findIndex((area) => area === value);
      areas.splice(targetIndex, 1);
    }

    setAreas([...areas]);
  };

  const dispatch = useDispatch();
  const { pokemons } = useSelector((state: RootState) => state.pokemons);

  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(getAllPokemons());
    }
  }, [dispatch, pokemons]);

  return (
    <>
      <div>
        <div>
          {pokemonArea.map((area, i) => {
            if (exceptPokemonArea.some((expectArea) => expectArea === area)) {
              return;
            }

            return (
              <button key={area} onClick={clickTab} value={i}>
                {area}
              </button>
            );
          })}
        </div>
      </div>

      <CategorizedByArea areas={areas} />
    </>
  );
};
