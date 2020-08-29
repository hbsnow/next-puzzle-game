import React from "react";

type Props = React.PropsWithoutRef<JSX.IntrinsicElements["button"]> & {
  fluid?: boolean;
};

export const Buttton: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <button
      onClick={(e) => {
        console.log(e.persist());
      }}
      {...rest}
    >
      {children}
    </button>
  );
};
