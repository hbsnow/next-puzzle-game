import { createStore, combineReducers } from "@reduxjs/toolkit";
import { renderHook, act } from "@testing-library/react-hooks";
import firebase from "firebase";
import { Provider } from "react-redux";

import userReducer, {
  UserState,
  userInitialState,
} from "../../store/userSlice";
import { useSignInWithProvider } from "./signInWithProvider";

const auth = ({
  signInWithPopup: () => undefined,
  getRedirectResult: () => undefined,
} as unknown) as firebase.auth.Auth;
const authProvider = {} as firebase.auth.AuthProvider;

const spySignInWithPopup = jest.spyOn(auth, "signInWithPopup");
const spyGetRedirectResult = jest.spyOn(auth, "getRedirectResult");

const getStore = (user?: UserState) => {
  return createStore(
    combineReducers({
      user: userReducer,
    }),
    {
      user: user ?? userInitialState,
    }
  );
};

describe(useSignInWithProvider.name, () => {
  let store: ReturnType<typeof getStore>;

  beforeEach(() => {
    store = getStore();
    spySignInWithPopup.mockResolvedValue({} as firebase.auth.UserCredential);
    spyGetRedirectResult.mockResolvedValue({} as firebase.auth.UserCredential);
  });

  afterEach(() => {
    spySignInWithPopup.mockClear();
    spyGetRedirectResult.mockClear();
  });

  test("initial value", () => {
    const { result } = renderHook(
      () => useSignInWithProvider(auth, authProvider),
      {
        wrapper: (props) => <Provider {...props} store={store} />,
      }
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  test("sign in", async () => {
    const { result } = renderHook(
      () => useSignInWithProvider(auth, authProvider),
      {
        wrapper: (props) => <Provider {...props} store={store} />,
      }
    );

    await act(async () => {
      await result.current.signInWithProvider();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(spySignInWithPopup).toHaveBeenCalledTimes(1);
    expect(spyGetRedirectResult).toHaveBeenCalledTimes(1);
  });

  test("error when signInWithPopup", async () => {
    spySignInWithPopup.mockRejectedValue(new Error());
    const { result } = renderHook(
      () => useSignInWithProvider(auth, authProvider),
      {
        wrapper: (props) => <Provider {...props} store={store} />,
      }
    );

    await act(async () => {
      await result.current.signInWithProvider();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).not.toBeUndefined();
    expect(auth.signInWithPopup).toHaveBeenCalledTimes(1);
    expect(auth.getRedirectResult).toHaveBeenCalledTimes(0);
  });

  test("error when getRedirectResult", async () => {
    spyGetRedirectResult.mockRejectedValue(new Error());
    const { result } = renderHook(
      () => useSignInWithProvider(auth, authProvider),
      {
        wrapper: (props) => <Provider {...props} store={store} />,
      }
    );

    await act(async () => {
      await result.current.signInWithProvider();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).not.toBeUndefined();
    expect(auth.signInWithPopup).toHaveBeenCalledTimes(1);
    expect(auth.getRedirectResult).toHaveBeenCalledTimes(1);
  });
});
