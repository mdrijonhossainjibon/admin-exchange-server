import React from "react";
import { Layout, Menu } from "antd";
import {  useLocation, useNavigate } from "react-router-dom";




export const sortMenuItems = (items) => {
  const compare = (a, b) => {
    if (a.key.length > b.key.length) return -1;
    if (a.key.length < b.key.length) return 1;
    return 0;
  };

  return Object.assign([], items).sort(compare);
};

export default function TabbedMenuLayout({ items }) {
  const { Sider } = Layout;
  const Navigate = useNavigate()
  const location = useLocation();

  const menuItemOnClick = (i) => {
    Navigate(String(i.key))
    const item = items.find((el) => String(el.key) === String(i.key));
    if (item && item.search) {
      
    } else {
      
    }
  };

  // sort items by descending key length to find the most matching route first
  const selectedKey = sortMenuItems(items).find((item) => location.pathname.includes(item.key))?.key;

  return (
    <Sider className="site-layout-background">
      <Menu mode="inline" selectedKeys={selectedKey ? [selectedKey] : undefined} onClick={menuItemOnClick}>
        {items.map((item) => (
          <Menu.Item key={item.key}>{item.content}</Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}
