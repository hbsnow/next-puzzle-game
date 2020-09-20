import React, { useState, useEffect, SyntheticEvent } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import {
  PokemonType,
  getAllPokemons,
  setChangedPokemons,
} from "../../store/pokemonsSlice";
import { UserState } from "../../store/userSlice";
import { PokemonBoxButtonList } from "./PokemonBoxButtonList";

export const PokemonBox: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { master } = useSelector((state: RootState) => state.pokemons);

  const [selectedAreas, setSelectedAreas] = useState<PokemonType["area"][]>([]);
  const [pokemons, setPokemons] = useState<
    Required<UserState>["user"]["pokemons"] | undefined
  >(undefined);

  const changeHandler = (data: SyntheticEvent<HTMLInputElement>) => {
    setPokemons({
      ...pokemons,
      ...{
        default: {
          ...pokemons?.default,
          [data.currentTarget.name]: parseInt(data.currentTarget.value),
        },
      },
    });

    dispatch(
      setChangedPokemons({
        key: "default",
        changedPokemons: {
          [data.currentTarget.name]: parseInt(data.currentTarget.value),
        },
      })
    );
  };

  useEffect(() => {
    if (!master) {
      dispatch(getAllPokemons());
    }
  }, [dispatch, master]);

  return (
    <>
      <PokemonBoxButtonList
        selectedAreas={selectedAreas}
        setSelectedAreas={setSelectedAreas}
      />

      {/* <PokemonBoxTable switchArea={switchArea} /> */}

      {master && user?.pokemons && (
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
                    <input
                      type="number"
                      min={0}
                      inputMode="decimal"
                      name={`${pokemon.no}`}
                      defaultValue={user.pokemons?.default?.[pokemon.no] ?? 0}
                      onChange={changeHandler}
                    />
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
