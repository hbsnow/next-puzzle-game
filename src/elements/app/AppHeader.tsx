import React from "react";

import styled from "styled-components";

import { AppHeaderMenu } from "./AppHeaderMenu";

type Props = {
  className?: string;
};

const Component: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <h1 className={`${className}__siteName`}>Lucky Pokemon Share</h1>

      <div className={`${className}__link`}>
        <AppHeaderMenu />
      </div>
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #000;

  & > &__siteName {
    font-size: 1rem;
    margin: 0;
    padding: 1rem;
  }

  & > &__link {
    padding: 1rem;
  }
`;

export const AppHeader = StyledComponent;
