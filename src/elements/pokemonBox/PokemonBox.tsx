import React from "react";

import { TabList, TabListItem, TabPanel } from "../../components/tab/TabParts";
import { useTabs } from "../../hooks/tab";

export const PokemonBox: React.FC = () => {
  const { clickTab, activeIndex } = useTabs();

  return (
    <>
      <TabList>
        <TabListItem>
          <button
            role="tab"
            aria-controls={name}
            aria-selected={activeIndex === 0}
            onClick={clickTab}
            value={0}
          >
            カントー
          </button>
        </TabListItem>
        <TabListItem>
          <button
            role="tab"
            aria-controls={name}
            aria-selected={activeIndex === 1}
            onClick={clickTab}
            value={1}
          >
            ジョウト
          </button>
        </TabListItem>
        <TabListItem>
          <button
            role="tab"
            aria-controls={name}
            aria-selected={activeIndex === 2}
            onClick={clickTab}
            value={2}
          >
            ホウエン
          </button>
        </TabListItem>
        <TabListItem>
          <button
            role="tab"
            aria-controls={name}
            aria-selected={activeIndex === 3}
            onClick={clickTab}
            value={3}
          >
            シンオウ
          </button>
        </TabListItem>
        <TabListItem>
          <button
            role="tab"
            aria-controls={name}
            aria-selected={activeIndex === 4}
            onClick={clickTab}
            value={4}
          >
            イッシュ
          </button>
        </TabListItem>
        <TabListItem>
          <button
            role="tab"
            aria-controls={name}
            aria-selected={activeIndex === 5}
            onClick={clickTab}
            value={5}
          >
            カロス
          </button>
        </TabListItem>
        <TabListItem>
          <button
            role="tab"
            aria-controls={name}
            aria-selected={activeIndex === 6}
            onClick={clickTab}
            value={6}
          >
            アローラ
          </button>
        </TabListItem>
        <TabListItem>
          <button
            role="tab"
            aria-controls={name}
            aria-selected={activeIndex === 7}
            onClick={clickTab}
            value={7}
          >
            ガラル
          </button>
        </TabListItem>
      </TabList>
      <TabPanel name="TabListItem0" hidden={activeIndex !== 0}>
        カントー
      </TabPanel>
      <TabPanel name="TabListItem1" hidden={activeIndex !== 1}>
        ジョウト
      </TabPanel>
      <TabPanel name="TabListItem2" hidden={activeIndex !== 2}>
        ホウエン
      </TabPanel>
      <TabPanel name="TabListItem2" hidden={activeIndex !== 3}>
        シンオウ
      </TabPanel>
      <TabPanel name="TabListItem2" hidden={activeIndex !== 4}>
        イッシュ
      </TabPanel>
      <TabPanel name="TabListItem2" hidden={activeIndex !== 5}>
        カロス
      </TabPanel>
      <TabPanel name="TabListItem2" hidden={activeIndex !== 6}>
        アローラ
      </TabPanel>
      <TabPanel name="TabListItem2" hidden={activeIndex !== 7}>
        ガラル
      </TabPanel>
    </>
  );
};
