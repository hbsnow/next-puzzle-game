import React from "react";

import styled from "styled-components";

type ContainerProps = {
  variant?: "solid" | "outline" | "link";
  color?: "default" | "primary";
  fill?: boolean;
} & React.PropsWithoutRef<JSX.IntrinsicElements["button"]>;

type Props = ContainerProps;

const Component: React.FC<Props> = ({ children, ...rest }) => {
  return <button {...rest}>{children}</button>;
};

const StyledComponent = styled(Component).withConfig({
  shouldForwardProp: (prop) => !["variant", "color", "fill"].includes(prop),
})`
  display: ${(props) => (props.fill ? "block" : "inline-block")};
  width: ${(props) => (props.fill ? "100%" : "auto")};
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  white-space: nowrap;
  border: 1px solid;
  border-color: ${(props) =>
    props.variant === "outline" ? "#ccc" : "transparent"};
  color: #575757;
  background: ${(props) =>
    props.variant === "solid" ? "#ccc" : "transparent"};
  color: #575757;
  user-select: none;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 6px;
`;

StyledComponent.defaultProps = {
  variant: "solid",
  color: "default",
  fill: false,
};

export const Button = StyledComponent;
