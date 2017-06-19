import React from 'react';
import Button from 'terra-button';
import Menu from 'terra-menu';

const group = (
  <Menu.ItemGroup isSelectable key="6">
    <Menu.Item text="Default 61" key="61" />
    <Menu.Item text="Default 62" key="62" />
    <Menu.Item text="Default 63" key="63" />
  </Menu.ItemGroup>
);

const buttonViews = [
  <Menu.Item text="Default 1" key="1" />,
  <Menu.Item
    text="Default 2"
    key="2"
    subMenuItems={[
      <Menu.Item text="Default 2.1" key="2.1" />,
      <Menu.Item text="Default 2.2" key="2.2" />,
      <Menu.Item text="Default 2.3" key="2.3" />,
    ]}
  />,
  <Menu.Item text="Default 3" key="3" />,
  <Menu.Item text="Default 4" key="4" />,
  <Menu.Item text="Default 5" key="5" />,
  group,
  <Menu.Item text="Default 6" key="7" />,
  <Menu.Item text="Default 7" key="8" />,
  <Menu.Item text="Default 8" key="9" />];

const target = <Button text="Click Me" id="test-menu-button" />;

const MenuDemo = () => (
  <Menu target={target}>
    {buttonViews}
  </Menu>
);

export default MenuDemo;
