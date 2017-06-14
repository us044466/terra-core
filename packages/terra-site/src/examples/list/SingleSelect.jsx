import React from 'react';

import SingleSelectList from 'terra-list/lib/SingleSelectList';

const list = () => (
  <SingleSelectList hasChevrons isDivided>
    <SingleSelectList.Item content={<p>test</p>} key="123" />
    <SingleSelectList.Item content={<p>test</p>} key="124" />
    <SingleSelectList.Item content={<p>test</p>} key="125" />
  </SingleSelectList>);

export default list;
