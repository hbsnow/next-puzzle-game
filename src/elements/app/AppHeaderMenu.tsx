import React from "react";

import Link from "next/link";
import styled from "styled-components";

type Props = {
  className?: string;
};

const Component: React.FC<Props> = (props) => {
  const { className } = props;

  return (
    <div className={className}>
      <Link href="/signout">
        <a>Sign Out</a>
      </Link>
    </div>
  );
};

const StyledComponent = styled(Component)``;

export const AppHeaderMenu: React.FC = () => {
  return <StyledComponent />;
};
