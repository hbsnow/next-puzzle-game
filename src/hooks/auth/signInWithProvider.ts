import { useCallback, useState, useEffect } from "react";

import firebase from "firebase/app";
import { useDispatch } from "react-redux";

import { auth } from "../../services/firebase/client";

/**
 * AuthProvider でサインイン
 */
export const useSignInWithProvider = (
  provider: firebase.auth.AuthProvider
): {
  isLoading: boolean;
  error?: Error;
  clearError: () => void;
  signInWithProvider: () => Promise<void>;
} => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isWaitingCallback, setIsWaitingCallback] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const clearError = useCallback(() => {
    setError(undefined);
  }, []);

  const signInWithProvider = useCallback(async () => {
    setIsLoading(true);

    try {
      await auth.signInWithPopup(provider);
      setIsWaitingCallback(true);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, [provider]);

  useEffect(() => {
    let didCancel = false;

    if (isWaitingCallback) {
      const getRedirectResult = async () => {
        try {
          await auth.getRedirectResult();
        } catch (err) {
          if (!didCancel) {
            setError(err);
          }
        } finally {
          if (!didCancel) {
            setIsWaitingCallback(false);
            setIsLoading(false);
          }
        }
      };

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
    signInWithProvider,
  };
};
