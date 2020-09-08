import { useCallback, useState } from "react";

const useTabs = (): {
  activeIndex: number;
  clickTab: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
} => {
  const [activeIndex, setActiveIndex] = useState(0);

  const clickTab = useCallback(
    (event: React.SyntheticEvent<HTMLButtonElement>) => {
      const element = event.currentTarget;
      const tabIndex = parseInt(element.value, 10);
      if (!Number.isNaN(tabIndex)) {
        setActiveIndex(tabIndex);
      }
    },
    []
  );

  return { activeIndex, clickTab };
};

export { useTabs };
