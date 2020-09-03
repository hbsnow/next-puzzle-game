import React, { useEffect } from "react";

import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";

import { auth } from "../../services/firebase/client";

const Page: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    let didCancel = false;

    const execute = async () => {
      await auth.signOut();

      if (!didCancel) {
        router.replace("/");
      }
    };

    execute();

    return () => {
      didCancel = true;
    };
  }, [router]);

  return <>サインアウト中です</>;
};

export default Page;
