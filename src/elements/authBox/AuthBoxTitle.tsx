import React from "react";

import styled from "styled-components";

type Props = {
  title: string;
  className?: string;
};

const Component: React.FC<Props> = ({ className, title }) => {
  return (
    <div className={className}>
      <h1>Lucky Pokemon Share</h1>
      <h2>{title}</h2>
    </div>
  );
};

const StyledComponent = styled(Component)`
  > h1 {
    font-size: 1.25rem;
    margin: 0;
  }

  > h2 {
    font-size: 1rem;
  }
`;

export const AuthBoxTitle = StyledComponent;
