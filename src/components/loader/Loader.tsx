import React from "react";

import { motion } from "framer-motion";
import styled from "styled-components";

type ContainerProps = {
  isLoading: boolean;
  isCoverScreen?: boolean;
};

type Props = {
  className?: string;
} & ContainerProps;

const Component: React.FC<Props> = (props) => {
  const { children, className, isLoading } = props;

  return (
    <div className={className} aria-busy={isLoading}>
      {children}

      <motion.div
        className={`${className}__overlay`}
        animate={isLoading ? "show" : "hidden"}
        variants={{
          show: {
            opacity: 1,
          },
          hidden: {
            opacity: 0,
            transitionEnd: {
              display: "none",
            },
          },
        }}
        aria-hidden={!isLoading}
        aria-label="Loading"
      >
        <div></div>
      </motion.div>
    </div>
  );
};

const StyledComponent = styled(Component)`
  position: relative;

  &__overlay {
    position: ${(props) => (props.isCoverScreen ? "fixed" : "absolute")};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.75);
  }
`;

const Loader: React.FC<Props> = (props) => {
  return <StyledComponent {...props} />;
};

export default Loader;
