import { motion } from "framer-motion";
import styled from "styled-components";

export const authLayoutContentVariants = {
  showSignIn: {
    opacity: 1,
    x: 0,
    display: "grid",
  },
  showSignUp: {
    opacity: 1,
    x: 0,
    display: "grid",
  },
  hiddenSignIn: {
    opacity: 0,
    x: -100,
    transitionEnd: {
      display: "none",
    },
  },
  hiddenSignUp: {
    opacity: 0,
    x: 100,
    transitionEnd: {
      display: "none",
    },
  },
};

export const StyledAuthLayout = styled.div`
  min-height: 100vh;
  place-items: center;
`;

export const StyledAuthLayoutContent = styled(motion.div)`
  position: absolute;
  display: grid;
  min-height: 100vh;
  width: 100%;
  place-items: center;
  padding: 1rem;
`;
