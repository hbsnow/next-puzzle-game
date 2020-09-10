import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import { PokemonType, getAllPokemons } from "../../store/pokemonsSlice";
import { CategorizedByArea } from "./CategorizedByArea";

export const PokemonBox: React.FC = () => {
  const [areas, setAreas] = useState<PokemonType["area"]>([]);
  const clickTab = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    const element = event.currentTarget;
    const value = element.value as PokemonType["area"][number];

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
    console.log(pokemons);
    if (pokemons.length === 0) {
      dispatch(getAllPokemons());
    }
  }, [dispatch, pokemons]);

  return (
    <>
      <div>
        <button
          onClick={() => {
            console.log(pokemons);
          }}
        >
          button
        </button>
      </div>
      <div>
        <div>
          <button onClick={clickTab} value="kanto">
            カントー 001-151
          </button>
          <div></div>
          <button onClick={clickTab} value="johto">
            ジョウト 152-251
          </button>
          <div></div>
          <button onClick={clickTab} value="hoenn">
            ホウエン 252-386
          </button>
          <div></div>
          <button onClick={clickTab} value="sinnoh">
            シンオウ 387-491
          </button>
          <div></div>
          <button onClick={clickTab} value="unova">
            イッシュ 494-649
          </button>
          <div></div>
          <button onClick={clickTab} value="galar">
            ガラル 862-863
          </button>
        </div>
      </div>

      <CategorizedByArea areas={areas} />
    </>
  );
};
