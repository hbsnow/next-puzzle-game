import React from "react";

import styled from "styled-components";

import { AppFooter } from "../elements/app/AppFooter";
import { AppHeader } from "../elements/app/AppHeader";

type Props = {
  className?: string;
};

const Component: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={className}>
      <AppHeader />

      <div className={`${className}__body`}>{children}</div>

      <AppFooter />
    </div>
  );
};

const StyledComponent = styled(Component)``;

export const AppTemplate = StyledComponent;
