import { AnyAction } from "@reduxjs/toolkit";

import reducer, { userInitialState, clearUser, setUser } from "./userSlice";

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
      displayName: "John Doe",
      email: "dummy@example.com",
      photoURL: "http://example.com",
      uid: "DUMMY",
    } as firebase.User;

    test("inserted user", () => {
      expect(reducer(userInitialState, setUser(user))).toEqual({
        user: {
          displayName: "John Doe",
          photoURL: "http://example.com",
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
