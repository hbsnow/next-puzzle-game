import { useCallback, useState } from "react";

import { useDispatch } from "react-redux";

import { auth } from "../../services/firebase/client";
import { setUser, clearUser } from "../../store/userSlice";

/**
 * メールアドレスとパスワードでサインイン
 */
export const useSignInWithEmailAndPassword = (): {
  isLoading: boolean;
  error?: Error;
  clearError: () => void;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
} => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const clearError = useCallback(() => {
    setError(undefined);
  }, []);

  const signInWithEmailAndPassword = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);

      try {
        const result = await auth.signInWithEmailAndPassword(email, password);
        if (result.user) {
          dispatch(setUser(result.user));
        } else {
          // TODO: ここにくるのはどういうケースなのか
          dispatch(clearUser());
        }
      } catch (err) {
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
    signInWithEmailAndPassword,
  };
};
