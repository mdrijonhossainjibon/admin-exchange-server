
import { Layout } from "antd";
import { useTranslation } from "react-i18next";

import { DollarOutlined, ShopOutlined, WalletOutlined, BlockOutlined, PercentageOutlined } from "@ant-design/icons";
import TabbedMenuLayout from "../../TabbedMenuLayout";


export const ConfigurationsLayouts =({ children }) =>{
  const { Content } = Layout;
  const { t } = useTranslation();
  
  const menuItems = [
    {
      key: '/configuration/blockchains',
      content: (
        <>
          <BlockOutlined />
          <span> {t("setter.layouts.configurations.nav.blockchains")}</span>
        </>
      ),
    },
    {
      key: '/configuration/currencies',
      content: (
        <>
          <DollarOutlined />
          <span> {t("setter.layouts.configurations.nav.currencies")}</span>
        </>
      ),
    },
    {
      key: '/configuration/wallets',
      content: (
        <>
          <WalletOutlined />
          <span> {t("setter.layouts.configurations.nav.wallets")}</span>
        </>
      ),
    },
    {
      key: '/configuration/markets',
      content: (
        <>
          <ShopOutlined />
          <span> {t("setter.layouts.configurations.nav.markets")}</span>
        </>
      ),
    },
    {
      key: '/configuration/feesSchedule',
      content: (
        <>
          <PercentageOutlined />
          <span> {t("setter.layouts.configurations.nav.feesSchedule")}</span>
        </>
      ),
    },
  ];

  return (
    <>
    
      <TabbedMenuLayout items={menuItems} />
      <Content >
       { children }
      </Content>
    </>
  );
}
