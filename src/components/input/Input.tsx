import React from "react";

import styled from "styled-components";

type ContainerProps = {
  fill?: boolean;
} & React.PropsWithoutRef<JSX.IntrinsicElements["input"]>;

type Props = ContainerProps;

const Component: React.FC<Props> = (props) => {
  return <input {...props} />;
};

const StyledComponent = styled(Component).withConfig({
  shouldForwardProp: (prop) => !["fill"].includes(prop),
})`
  display: ${(props) => (props.fill ? "block" : "inline-block")};
  width: ${(props) => (props.fill ? "100%" : "auto")};
  vertical-align: middle;
  white-space: nowrap;
  border: 1px solid transparent;
  color: #575757;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  padding: 0.25rem 0.125rem;
`;

StyledComponent.defaultProps = {
  fill: false,
};

export const Input = StyledComponent;
