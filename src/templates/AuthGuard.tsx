import React, { useEffect, useState } from "react";

import firebase, { firestore } from "firebase/app";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Loader from "../components/loader/Loader";
import { auth } from "../services/firebase/client";
import { RootState } from "../store";
import { categorizedKey } from "../store/pokemonsSlice";
import { setUser, clearUser, getUserDoc, UserState } from "../store/userSlice";
import { AppTemplate } from "./AppTemplate";
import { AuthTemplate } from "./AuthTemplate";

export const AuthContext = React.createContext<undefined>(undefined);

type Props = {
  className?: string;
  isLoading: boolean;
  isAuthorized: boolean;
};

const mightRegist = async (
  uid: firebase.User["uid"]
): Promise<firestore.DocumentSnapshot<UserState["user"]>> => {
  const userDoc = getUserDoc(uid);
  const snapshot = await userDoc.get();

  if (snapshot.exists) {
    return snapshot;
  }

  const timestamp = firestore.FieldValue.serverTimestamp();
  const pokemons = Object.fromEntries(
    categorizedKey.map((key) => [key, {}])
  ) as Required<UserState>["user"]["pokemons"];
  await userDoc.set({
    userId: uid,
    pokemons,
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  return userDoc.get();
};

const Component: React.FC<Props> = (props) => {
  const { className, isLoading, isAuthorized } = props;

  return (
    <div className={className}>
      <Loader isLoading={isLoading} isCoverScreen>
        {isAuthorized ? (
          <AppTemplate>{props.children}</AppTemplate>
        ) : (
          <AuthTemplate />
        )}
      </Loader>
    </div>
  );
};

const StyledComponent = styled(Component)``;

export const AuthGuard: React.FC = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (nextUser) => {
      if (nextUser) {
        try {
          const snapshot = await mightRegist(nextUser.uid);
          const user = snapshot.data();

          dispatch(setUser(user));
        } finally {
          setIsLoading(false);
        }
      } else {
        dispatch(clearUser());
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <StyledComponent isLoading={isLoading} isAuthorized={!!user} {...props} />
  );
};
