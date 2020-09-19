import React from "react";

import styled from "styled-components";

type Props = {
  className?: string;
};

const Component: React.FC<Props> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

const StyledComponent = styled(Component)`
  width: 100%;
  max-width: 24rem;
  background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
`;

export const AuthBox = StyledComponent;
