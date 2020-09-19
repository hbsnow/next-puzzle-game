import { motion } from "framer-motion";
import styled from "styled-components";

export const authLayoutContentVariants = {
  signIn: {
    opacity: 1,
    display: "grid",
  },
  signUp: {
    opacity: 1,
    display: "grid",
  },
  hidden: {
    opacity: 0,
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

export const StyledAuthBox = styled(motion.div)`
  width: 100%;
  max-width: 24rem;
  background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
`;
