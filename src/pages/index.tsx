import React from "react";

import { NextPage } from "next";

import { PokemonBox } from "../elements/pokemonBox/PokemonBox";
import { AuthGuard } from "../templates/AuthGuard";

const Page: NextPage = () => {
  return (
    <AuthGuard>
      <PokemonBox />
    </AuthGuard>
  );
};

export default Page;
