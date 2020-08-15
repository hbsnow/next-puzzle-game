import { useEffect } from "react";

import { useAuth0, Auth0ContextInterface } from "@auth0/auth0-react";
import * as firebase from "firebase/app";
import "firebase/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { setUser } from "../store/userSlice";

export const useAuth = (): Pick<
  Auth0ContextInterface,
  "logout" | "loginWithRedirect"
> => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    isAuthenticated,
    user,
    logout,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && router.pathname !== "/") {
      router.push("/");
      return;
    }

    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch, isAuthenticated, router, user]);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch("/firebase", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const firebaseToken = (((await response.json()) as unknown) as {
          firebaseToken: string;
        }).firebaseToken;

        firebase.auth().signInWithCustomToken(firebaseToken);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  return { logout, loginWithRedirect };
};
