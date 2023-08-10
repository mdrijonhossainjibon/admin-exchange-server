import { lazy } from "react";
import { Layout } from "antd";
import { useTranslation } from "react-i18next";
import { ExceptionOutlined, FileDoneOutlined } from "@ant-design/icons";
import TabbedMenuLayout from "../../TabbedMenuLayout";
import { Restrictions } from "./restrictions";
import { UserPermissions } from "./user-permissions";


//const restrictions = lazy(() => import("./restrictions/Restrictions"));
//const userPermissions = lazy(() => import("./user-permissions/UserPermissions"));

export const DevopsLayout = ({ children })=> {
  const { Content } = Layout;
  const { t } = useTranslation();

  const menuItems = [
    {
      key: '/devops',
      content: (
        <>
          <FileDoneOutlined />
          <span>{t("setter.layouts.devops.nav.restrictions")}</span>
        </>
      ),
    },
    {
      key: '/devops/userPermissions',
      content: (
        <>
          <ExceptionOutlined />
          <span>{t("setter.layouts.devops.nav.userPermissions")}</span>
        </>
      ),
    },
  ];

  return (
    <>
      <TabbedMenuLayout items={menuItems}  />
      <Content >
{ children ? children : <Restrictions/> }
      </Content>
    </>
  );
}
