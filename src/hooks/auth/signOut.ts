import { useCallback, useState } from "react";

import { useDispatch } from "react-redux";

import { auth } from "../../services/firebase/client";
import { clearUser } from "../../store/userSlice";

/**
 * サインアウト
 */
export const useSignOut = (): {
  isLoading: boolean;
  error?: Error;
  clearError: () => void;
  signOut: () => Promise<void>;
} => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const clearError = useCallback(() => {
    setError(undefined);
  }, []);

  const signOut = useCallback(async () => {
    setIsLoading(true);

    try {
      await auth.signOut();
      dispatch(clearUser());
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  return {
    isLoading,
    error,
    clearError,
    signOut,
  };
};
