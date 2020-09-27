import React, { useCallback, useState } from "react";

import styled from "styled-components";

import { AppHeaderMenu } from "./AppHeaderMenu";

type Props = {
  className?: string;
  isOpen: boolean;
  toggleButton: () => void;
};

const Component: React.FC<Props> = (props) => {
  const { className, isOpen, toggleButton } = props;

  return (
    <div className={className}>
      <h1 className={`${className}__siteName`}>Lucky Pokemon Share</h1>

      <AppHeaderMenu isOpen={isOpen} toggleButton={toggleButton} />
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #000;
  padding: 0.75rem 1rem;

  & > &__siteName {
    font-size: 1rem;
    margin: 0;
  }
`;

export const AppHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleButton = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  return <StyledComponent isOpen={isOpen} toggleButton={toggleButton} />;
};
