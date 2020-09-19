import React from "react";

import styled from "styled-components";

type ButtonProps = {
  appearance?: "default" | "primary";
  fill?: boolean;
} & React.PropsWithoutRef<JSX.IntrinsicElements["button"]>;

type Props = ButtonProps;

const Component: React.FC<Props> = ({ children, ...rest }) => {
  return <button {...rest}>{children}</button>;
};

const StyledComponent = styled(Component).withConfig({
  shouldForwardProp: (prop) => !["fill", "appearance"].includes(prop),
})`
  color: #575757;
  background: #f7f7fa;
  display: ${(props) => (props.fill ? "block" : "inline-block")};
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  white-space: nowrap;
  border: 1px solid transparent;
  user-select: none;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 6px;
`;

export const Button = StyledComponent;
