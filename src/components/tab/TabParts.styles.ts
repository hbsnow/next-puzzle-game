import styled from "styled-components";

export const StyledTabList = styled.ul<{
  wrap?: boolean;
}>`
  display: flex;
  flex-wrap: ${(p) => (p?.wrap ? "wrap" : "nowrap")};
  justify-content: center;
`;

export const StyledTabListItem = styled.li`
  flex: 1 1 auto;
`;

export const StyledTabPanel = styled.div`
  &[aria-hidden="true"] {
    display: none;
  }

  &[aria-hidden="false"] {
    display: block;
  }
`;
