import { useCallback, useState, useEffect } from "react";

import firebase from "firebase/app";
import { useDispatch } from "react-redux";

import { auth } from "../services/firebase/client";
import { setUser, clearUser } from "../store/userSlice";

/**
 * サインイン
 */
export const useSignIn = (): {
  isLoading: boolean;
  error?: Error;
  clearError: () => void;
  signInWithEmailAndPassword: (email: string, password: string) => void;
  signInWithGoogle: () => void;
} => {
  const dispatch = useDispatch();
  const [isWaitingCallback, setIsWaitingCallback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const clearError = useCallback(() => {
    setError(undefined);
  }, []);

  const signInWithGoogle = useCallback(() => {
    setIsLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(() => {
        setIsWaitingCallback(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const signInWithEmailAndPassword = useCallback(
    (email: string, password: string) => {
      setIsLoading(true);
      auth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          if (result.user) {
            dispatch(setUser(result.user));
          }
        })
        .catch((err) => {
          dispatch(clearUser());
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [dispatch]
  );

  useEffect(() => {
    if (isWaitingCallback) {
      setIsLoading(true);
      auth
        .getRedirectResult()
        .then((result) => {
          if (result.user) {
            dispatch(setUser(result.user));
          }
        })
        .catch((err) => {
          dispatch(clearUser());
          setError(err);
        })
        .finally(() => {
          setIsWaitingCallback(false);
          setIsLoading(false);
        });
    }
  }, [dispatch, isWaitingCallback]);

  return {
    isLoading,
    error,
    clearError,
    signInWithEmailAndPassword,
    signInWithGoogle,
  };
};
