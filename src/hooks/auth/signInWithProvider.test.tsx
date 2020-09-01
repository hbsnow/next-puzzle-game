import { createStore, combineReducers } from "@reduxjs/toolkit";
import { renderHook, act } from "@testing-library/react-hooks";
import firebase from "firebase";
import { Provider } from "react-redux";
import { mocked } from "ts-jest/utils";

import { auth } from "../../services/firebase/client";
import userReducer, {
  UserState,
  userInitialState,
} from "../../store/userSlice";
import { useSignInWithProvider } from "./signInWithProvider";

jest.mock("../../services/firebase/client", () => {
  return {
    auth: {
      signInWithPopup: jest.fn(),
      getRedirectResult: jest.fn(),
    },
  };
});
const mockSignInWithPopup = mocked(auth.signInWithPopup);
const mockGetRedirectResult = mocked(auth.getRedirectResult);

const provider = {} as firebase.auth.AuthProvider;

const getStore = ({ user }: { user?: UserState }) => {
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
    store = getStore({
      user: { ...userInitialState },
    });

    mockSignInWithPopup.mockReset();
    mockGetRedirectResult.mockReset();
  });

  it("initial value", () => {
    const { result } = renderHook(() => useSignInWithProvider(provider), {
      wrapper: (props) => <Provider {...props} store={store} />,
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("sign in", async () => {
    const { result } = renderHook(() => useSignInWithProvider(provider), {
      wrapper: (props) => <Provider {...props} store={store} />,
    });

    await act(async () => {
      await result.current.signInWithProvider();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(auth.signInWithPopup).toHaveBeenCalledTimes(1);
    expect(auth.getRedirectResult).toHaveBeenCalledTimes(1);
  });

  it("error when signInWithPopup", async () => {
    mockSignInWithPopup.mockRejectedValue(new Error());
    const { result } = renderHook(() => useSignInWithProvider(provider), {
      wrapper: (props) => <Provider {...props} store={store} />,
    });

    await act(async () => {
      await result.current.signInWithProvider();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).not.toBeUndefined();
    expect(auth.signInWithPopup).toHaveBeenCalledTimes(1);
    expect(auth.getRedirectResult).toHaveBeenCalledTimes(0);
  });

  it("error when getRedirectResult", async () => {
    mockGetRedirectResult.mockRejectedValue(new Error());
    const { result } = renderHook(() => useSignInWithProvider(provider), {
      wrapper: (props) => <Provider {...props} store={store} />,
    });

    await act(async () => {
      await result.current.signInWithProvider();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).not.toBeUndefined();
    expect(auth.signInWithPopup).toHaveBeenCalledTimes(1);
    expect(auth.getRedirectResult).toHaveBeenCalledTimes(1);
  });
});
