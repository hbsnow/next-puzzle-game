import { useCallback, useState } from "react";

import { useDispatch } from "react-redux";

import { firebase } from "../services/firebase/client";
import { clearUser } from "../store/userSlice";

/**
 * アカウント作成
 */
export const useSignUp = (): {
  isLoading: boolean;
  error?: Error;
  clearError: () => void;
  createUserWithEmailAndPassword: (email: string, password: string) => void;
} => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const clearError = useCallback(() => {
    setError(undefined);
  }, []);

  const createUserWithEmailAndPassword = useCallback(
    (email: string, password: string) => {
      setIsLoading(true);

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        // .then((result) => {
        //   dispatch(setUser(result.user));
        // })
        .catch((err) => {
          // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword
          dispatch(clearUser());
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [dispatch]
  );

  return {
    isLoading,
    error,
    clearError,
    createUserWithEmailAndPassword,
  };
};
