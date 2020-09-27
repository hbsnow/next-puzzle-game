import React from "react";

import styled from "styled-components";

import { AppFooter } from "../elements/appFooter/AppFooter";
import { AppHeader } from "../elements/appHeader/AppHeader";

type Props = {
  className?: string;
};

const Component: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={className}>
      <AppHeader />

      {children}

      <AppFooter />
    </div>
  );
};

const StyledComponent = styled(Component)``;

export const AppTemplate = StyledComponent;
