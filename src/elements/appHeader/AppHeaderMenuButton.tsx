import React from "react";

import styled from "styled-components";

import { Icon } from "../../components/icon/Icon";

type ContainerProps = {
  toggleButton: () => void;
};

type Props = {
  className?: string;
} & ContainerProps;

const Component: React.FC<Props> = (props) => {
  const { className, toggleButton } = props;

  return (
    <button className={className} onClick={toggleButton}>
      <Icon name="setting" />
    </button>
  );
};

const StyledComponent = styled(Component)`
  border: 0;
  background: transparent;
  line-height: 1;
`;

export const AppHeaderMenuButton: React.FC<ContainerProps> = (props) => {
  return <StyledComponent {...props} />;
};
