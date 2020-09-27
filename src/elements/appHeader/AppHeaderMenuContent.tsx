import React from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";

type ContainerProps = {
  isOpen: boolean;
};

type Props = {
  className?: string;
} & ContainerProps;

const Component: React.FC<Props> = (props) => {
  const { className, isOpen } = props;

  return (
    <motion.div
      className={className}
      animate={isOpen ? "showMenu" : "hiddenMenu"}
      variants={menuVariants}
    >
      <Link href="/signout">
        <a>Sign Out</a>
      </Link>
    </motion.div>
  );
};

const menuVariants = {
  showMenu: {
    opacity: 1,
    y: 0,
    display: "block",
  },
  hiddenMenu: {
    opacity: 0,
    y: -20,
    transitionEnd: {
      display: "none",
    },
  },
} as const;

const StyledComponent = styled(Component)`
  background-color: #fff;
  border-radius: 0.375rem;
  padding: 0.75rem;
`;

export const AppHeaderMenuContent: React.FC<ContainerProps> = (props) => {
  return <StyledComponent {...props} />;
};
