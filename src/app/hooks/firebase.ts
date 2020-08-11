import { useState, useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";

export const useFirebase = (): {
  token: string;
} => {
  const [token, setToken] = useState<string>(undefined);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch("/firebase", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const firebaseToken = (((await response.json()) as unknown) as {
          firebaseToken: string;
        }).firebaseToken;

        setToken(firebaseToken);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  return { token };
};
