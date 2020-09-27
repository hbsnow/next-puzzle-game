import React from "react";

import styled from "styled-components";

import { AppHeaderMenuButton } from "./AppHeaderMenuButton";
import { AppHeaderMenuContent } from "./AppHeaderMenuContent";

type ContainerProps = {
  isOpen: boolean;
  toggleButton: () => void;
};

type Props = {
  className?: string;
} & ContainerProps;

const Component: React.FC<Props> = (props) => {
  const { className, isOpen, toggleButton } = props;

  return (
    <div className={className}>
      <AppHeaderMenuButton toggleButton={toggleButton} />
      <div className={`${className}__content`}>
        <AppHeaderMenuContent isOpen={isOpen} />
      </div>
    </div>
  );
};

const StyledComponent = styled(Component)`
  position: relative;
  z-index: 2;

  & > &__content {
    position: absolute;
    bottom: -3rem;
    right: -0.75rem;
    min-width: 8rem;
  }
`;

export const AppHeaderMenu: React.FC<ContainerProps> = (props) => {
  return <StyledComponent {...props} />;
};
