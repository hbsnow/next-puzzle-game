import { createStore, combineReducers } from "@reduxjs/toolkit";
import { renderHook, act } from "@testing-library/react-hooks";
import { Provider } from "react-redux";

import { auth } from "../../../services/firebase/client";
import userReducer, {
  UserState,
  userInitialState,
} from "../../../store/userSlice";
import { useSignOut } from "../signOut";

jest.mock("../../../services/firebase/client", () => {
  return {
    auth: {
      signOut: jest.fn(),
    },
  };
});

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

describe(useSignOut.name, () => {
  let userInfo: UserState["userInfo"];
  let store: ReturnType<typeof getStore>;
  const mockSignOut = (auth.signOut as unknown) as jest.Mock;

  beforeEach(() => {
    userInfo = {
      displayName: "テスト太郎",
      photoURL: "https://example.com/cat.jpg",
    };

    store = getStore({
      user: { ...userInitialState, userInfo },
    });

    mockSignOut.mockReset();
    mockSignOut.mockRestore();
  });

  it("initial value", () => {
    const { result } = renderHook(() => useSignOut(), {
      wrapper: (props) => <Provider {...props} store={store} />,
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("when sign out", async () => {
    const { result } = renderHook(() => useSignOut(), {
      wrapper: (props) => <Provider {...props} store={store} />,
    });

    await act(async () => {
      mockSignOut.mockResolvedValue(undefined);
      await result.current.signOut();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(auth.signOut).toHaveBeenCalledTimes(1);
  });

  it("throw exception when something error", async () => {
    const { result } = renderHook(() => useSignOut(), {
      wrapper: (props) => <Provider {...props} store={store} />,
    });
    mockSignOut.mockRejectedValue(new Error("error"));

    await act(async () => {
      await result.current.signOut();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).not.toBeUndefined();
    expect(auth.signOut).toHaveBeenCalledTimes(1);
  });
});
