import { useCallback, useState, useEffect } from "react";

import firebase from "firebase/app";
import { useDispatch } from "react-redux";

import { auth } from "../../services/firebase/client";
import { setUser, clearUser } from "../../store/userSlice";

/**
 * Google でサインイン
 */
export const useSignInWithGoogle = (): {
  isLoading: boolean;
  error?: Error;
  clearError: () => void;
  signInWithGoogle: () => Promise<void>;
} => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isWaitingCallback, setIsWaitingCallback] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const clearError = useCallback(() => {
    setError(undefined);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      await auth.signInWithPopup(provider);
      setIsWaitingCallback(true);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let didCancel = false;

    const getRedirectResult = async () => {
      try {
        const result = await auth.getRedirectResult();
        if (!didCancel) {
          if (result.user) {
            dispatch(setUser(result.user));
          } else {
            // TODO: ここにくるのはどういうケースなのか
            dispatch(clearUser());
          }
        }
      } catch (err) {
        if (!didCancel) {
          dispatch(clearUser());
          setError(err);
        }
      } finally {
        if (!didCancel) {
          setIsWaitingCallback(false);
          setIsLoading(false);
        }
      }
    };

    if (isWaitingCallback) {
      getRedirectResult();
    }

    return () => {
      didCancel = true;
    };
  }, [dispatch, isWaitingCallback]);

  return {
    isLoading,
    error,
    clearError,
    signInWithGoogle,
  };
};
