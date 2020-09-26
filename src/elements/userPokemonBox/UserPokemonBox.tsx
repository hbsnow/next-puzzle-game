import React, { useEffect, useMemo } from "react";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { RootState } from "../../store";
import {
  getAllPokemons,
  getUserPokemons,
  PokemonsState,
} from "../../store/pokemonsSlice";
import { PokemonBoxType } from "../../types/pokemon";
import { UserPokemonBoxTable } from "./UserPokemonBoxTable";

type Props = {
  className?: string;
  master?: PokemonsState["master"];
  pokemons?: PokemonBoxType[];
};

const Component: React.FC<Props> = ({ className, master, pokemons }) => {
  return (
    <div className={className}>
      <UserPokemonBoxTable master={master} pokemons={pokemons} />
    </div>
  );
};

const StyledComponent = styled(Component)``;

export const UserPokemonBox: React.FC = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { master, users } = useSelector((state: RootState) => state.pokemons);

  const userId = useMemo(() => {
    return Array.isArray(router.query.userId)
      ? router.query.userId[0]
      : router.query.userId;
  }, [router.query.userId]);

  const pokemons = useMemo(() => {
    return userId ? users?.[userId] : undefined;
  }, [userId, users]);

  useEffect(() => {
    if (userId) {
      dispatch(getUserPokemons({ userId }));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (!master) {
      dispatch(getAllPokemons());
    }
  }, [dispatch, master]);

  return <StyledComponent master={master} pokemons={pokemons} {...props} />;
};
