import { AnyAction } from "@reduxjs/toolkit";

import reducer, {
  userInitialState,
  clearUser,
  setUser,
  UserState,
} from "./userSlice";

describe("state", () => {
  it("initial state", function () {
    expect(reducer(userInitialState, {} as AnyAction)).toEqual({
      user: undefined,
    });
  });
});

describe("action", () => {
  describe("setUser()", () => {
    const user = {
      userId: "userId",
    } as UserState["user"];

    test("inserted user", () => {
      expect(reducer(userInitialState, setUser(user))).toEqual({
        user: {
          userId: "userId",
        },
      });
    });
  });

  describe("clearUser()", () => {
    test("clear user", () => {
      expect(reducer(userInitialState, clearUser())).toEqual({
        user: undefined,
      });
    });
  });
});
