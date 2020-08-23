import React, { useEffect } from "react";

import { NextPage } from "next";

import { AuthGuard } from "../templates/AuthGuard";

const Page: NextPage = () => {
  const inputEl = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    console.log(inputEl.current); // TypeScript won't require null-check e.g. ref1 && ref1.current
  });
  return (
    <AuthGuard>
      <p>ログインしてるよ</p>

      <input ref={inputEl} type="text" />
      {/* <pre>[{JSON.stringify(user, null, 2)}]</pre>
      <p style={{ width: "400px", overflow: "auto" }}>{token}</p> */}
    </AuthGuard>
  );
};

export default Page;
