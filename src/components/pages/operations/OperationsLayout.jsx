import { Suspense, lazy } from "react";
import { Layout, Spin } from "antd";
import { useTranslation } from "react-i18next";
import {
  AuditOutlined,
  PieChartOutlined,
  DownloadOutlined,
  UploadOutlined,
  FieldTimeOutlined,
  TransactionOutlined,
  ControlOutlined,
} from "@ant-design/icons";

import TabbedMenuLayout from "../../TabbedMenuLayout";


export const OperationsLayout = ({ children }) =>{
  const { Content } = Layout;
  const { t } = useTranslation();

  const menuItems = [
    {
      key: '/operations/deposits',
      content: (
        <>
          <DownloadOutlined />
          <span>{t("setter.layouts.operations.nav.deposits")}</span>
        </>
      ),
    },
    {
      key: '/operations/withdrawals',
      content: (
        <>
          <UploadOutlined />
          <span>{t("setter.layouts.operations.nav.withdrawals")}</span>
        </>
      ),
    },
    {
      key: '/operations/pendingWithdrawals',
      content: (
        <>
          <FieldTimeOutlined />
          <span>{t("setter.layouts.operations.nav.pendingWithdrawals")}</span>
        </>
      ),
    },
    {
      key: '/operations/adjustments',
      content: (
        <>
          <ControlOutlined />
          <span>{t("setter.layouts.operations.nav.adjustments")}</span>
        </>
      ),
    },
    {
      key: '/operations/orders',
      content: (
        <>
          <AuditOutlined />
          <span>{t("setter.layouts.operations.nav.orders")}</span>
        </>
      ),
    },
    {
      key: '/operations/trades',
      content: (
        <>
          <TransactionOutlined />
          <span>{t("setter.layouts.operations.nav.trades")}</span>
        </>
      ),
    },
    {
      key: '/operations/businessAnalytics',
      content: (
        <>
          <PieChartOutlined />
          <span>{t("setter.layouts.operations.nav.businessAnalytics")}</span>
        </>
      ),
    },
  ];

  return (
    <>
      <TabbedMenuLayout items={menuItems} />
      <Content>
        <Suspense
          fallback={
            <div className="spinner-container">
              <Spin size="large" className="setter-spinner-centered" />
            </div>
          }
        >
          { children }
        </Suspense>
      </Content>
    </>
  );
}
