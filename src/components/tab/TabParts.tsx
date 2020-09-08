import React from "react";

import {
  StyledTabList,
  StyledTabListItem,
  StyledTabPanel,
} from "./TabParts.styles";

export const TabList: React.FC = ({ children }) => {
  return (
    <StyledTabList role="tablist" wrap={true}>
      {children}
    </StyledTabList>
  );
};

export const TabListItem: React.FC = ({ children }) => {
  return <StyledTabListItem role="presentation">{children}</StyledTabListItem>;
};

export const TabPanel: React.FC<{
  name: string;
  hidden: boolean;
}> = ({ name, hidden, children }) => {
  return (
    <StyledTabPanel role="tabpanel" id={name} aria-hidden={hidden}>
      {children}
    </StyledTabPanel>
  );
};
