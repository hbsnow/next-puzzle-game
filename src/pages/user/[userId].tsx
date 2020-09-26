import React from "react";

import { NextPage } from "next";

import { UserPokemonBox } from "../../elements/userPokemonBox/UserPokemonBox";
import { PublicTemplate } from "../../templates/PublicTemplate";

const Page: NextPage = () => {
  return (
    <PublicTemplate>
      <UserPokemonBox />
    </PublicTemplate>
  );
};

export default Page;
