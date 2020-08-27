import { useCallback, useState } from "react";

import { useDispatch } from "react-redux";

import { auth } from "../services/firebase/client";
import { clearUser } from "../store/userSlice";

/**
 * サインアウト
 */
export const useSignOut = (): {
  isLoading: boolean;
  error?: Error;
  clearError: () => void;
  signOut: () => void;
} => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const clearError = useCallback(() => {
    setError(undefined);
  }, []);

  const signOut = useCallback(() => {
    setIsLoading(true);

    auth
      .signOut()
      .then(() => {
        dispatch(clearUser());
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  return {
    isLoading,
    error,
    clearError,
    signOut,
  };
};
