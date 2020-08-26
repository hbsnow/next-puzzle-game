import React from "react";

type Props = {
  fluid?: boolean;
} & React.PropsWithoutRef<JSX.IntrinsicElements["button"]>;

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
