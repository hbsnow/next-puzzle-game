import React from "react";

import { PokemonType } from "../../store/pokemonsSlice";

type Props = {
  area: PokemonType["area"];
};

export const CategorizedByArea: React.FC<Props> = ({ area }) => {
  return <>{area}</>;
};
