import React from "react";

import styled from "styled-components";

type Props = {
  className?: string;
};

const Component: React.FC<Props> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

const StyledComponent = styled(Component)``;

export const PublicTemplate = StyledComponent;
