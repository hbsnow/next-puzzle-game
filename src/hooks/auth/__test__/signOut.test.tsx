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

  beforeEach(() => {
    userInfo = {
      displayName: "テスト太郎",
      photoURL: "https://example.com/cat.jpg",
    };

    store = getStore({
      user: { ...userInitialState, userInfo },
    });
  });

  it("初期値でローディングはせず、エラーもない状態か", () => {
    const { result } = renderHook(() => useSignOut(), {
      wrapper: (props) => <Provider {...props} store={store} />,
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("サインアウトが確実に呼び出されているか", async () => {
    const { result } = renderHook(() => useSignOut(), {
      wrapper: (props) => <Provider {...props} store={store} />,
    });

    await act(async () => {
      ((auth.signOut as unknown) as jest.Mock).mockReturnValue(() => undefined);
      await result.current.signOut();
    });

    expect(auth.signOut).toHaveBeenCalledTimes(1);
  });
});
