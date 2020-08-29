import { renderHook, act } from "@testing-library/react-hooks";

import { auth } from "../../../services/firebase/client";
import { useSignOut } from "../signOut";

jest.mock("../../../services/firebase/client", () => {
  return {
    auth: {
      signOut: jest.fn(),
    },
  };
});

describe(useSignOut.name, () => {
  it("initial value", () => {
    const { result } = renderHook(() => useSignOut());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("when sign out", async () => {
    const { result } = renderHook(() => useSignOut());

    await act(async () => {
      ((auth.signOut as unknown) as jest.Mock).mockReturnValue(() => undefined);
      await result.current.signOut();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(auth.signOut).toHaveBeenCalledTimes(1);
  });
});
