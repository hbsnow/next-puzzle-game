import React from "react";

import { PokemonType } from "../../store/pokemonsSlice";

type Props = {
  areas: PokemonType["area"];
};

export const CategorizedByArea: React.FC<Props> = ({ areas }) => {
  return (
    <ul>
      {areas.map((area) => {
        return <li key={area}>{area}</li>;
      })}
    </ul>
  );
};
