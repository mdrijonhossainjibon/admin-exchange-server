
import { Layout } from "antd";
import { BarsOutlined, TeamOutlined, ContainerOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import TabbedMenuLayout from "../../TabbedMenuLayout";



export const UsersLayout = ({ children })=> {
  const { Content } = Layout;
  const { t } = useTranslation();

  const menuItems = [
    {
      key: '/users',
      content: (
        <>
          <TeamOutlined />
          <span>{t("setter.layouts.users.nav.users")}</span>
        </>
      ),
    },
    {
      key: '/users/applications',
      content: (
        <>
          <ContainerOutlined />
          <span>{t("setter.layouts.users.nav.applications")}</span>
        </>
      ),
    },
      {
        key: '/users/activities',
        content: (
        <>
        <BarsOutlined />
         <span>{t("setter.layouts.users.nav.activities")}</span>
          </>
     ),
      },
  ];

  return (
    <>
      <TabbedMenuLayout items={menuItems} />
      <Content>


{ children }

      </Content>
    </>
  );
}
