import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import {
  PokemonType,
  getAllPokemons,
  pokemonArea,
  exceptPokemonArea,
} from "../../store/pokemonsSlice";

export const PokemonBox: React.FC = () => {
  const [selectedAreas, setSelectedAreas] = useState<PokemonType["area"][]>([]);
  const clickTab = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    const element = event.currentTarget;
    const value = parseInt(element.value);

    if (!selectedAreas.some((area) => area === value)) {
      selectedAreas.push(value);
    } else {
      const targetIndex = selectedAreas.findIndex((area) => area === value);
      selectedAreas.splice(targetIndex, 1);
    }

    setSelectedAreas([...selectedAreas]);
  };

  const dispatch = useDispatch();
  const { master } = useSelector((state: RootState) => state.pokemons);

  useEffect(() => {
    if (!master) {
      dispatch(getAllPokemons());
    }
  }, [dispatch, master]);

  return (
    <>
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

      {master && (
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Lucky</td>
            </tr>
          </thead>
          <tbody>
            {master.default.map((pokemon) => {
              if (!selectedAreas.some((area) => area === pokemon.area)) {
                return;
              }

              return (
                <tr key={pokemon.no}>
                  <td>{pokemon.name}</td>
                  <td>
                    <input type="number" min={0} inputMode="decimal" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
