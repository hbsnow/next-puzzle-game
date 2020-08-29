import { useCallback, useState } from "react";

import { useDispatch } from "react-redux";

import { auth } from "../../services/firebase/client";
import { clearUser, setUser } from "../../store/userSlice";

/**
 * アカウント作成
 */
export const useSignUpWithEmailAndPassword = (): {
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
    async (email: string, password: string) => {
      setIsLoading(true);

      try {
        const result = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        if (result.user) {
          dispatch(setUser(result.user));
        } else {
          // TODO: ここにくるのはどういうケースなのか
          dispatch(clearUser());
        }
      } catch (err) {
        // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword
        dispatch(clearUser());
        setError(err);
      } finally {
        setIsLoading(false);
      }
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
