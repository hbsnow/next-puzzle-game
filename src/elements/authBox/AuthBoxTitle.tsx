import React from "react";

import styled from "styled-components";

type Props = {
  title: string;
  className?: string;
};

const Component: React.FC<Props> = ({ className, title }) => {
  return (
    <div className={className}>
      <h1 className={`${className}__siteName`}>Lucky Pokemon Share</h1>
      <h2 className={`${className}__title`}>{title}</h2>
    </div>
  );
};

const StyledComponent = styled(Component)`
  & > &__siteName {
    font-size: 1.25rem;
    margin: 0;
  }

  & > &__title {
    font-size: 1rem;
  }
`;

export const AuthBoxTitle = StyledComponent;
