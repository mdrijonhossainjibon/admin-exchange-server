import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Empty, PageHeader, Skeleton, Tabs, Button, Space, Card } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useNavigate, useLocation, useParams} from "react-router-dom";
import{ WalletDetailsMain }from "./main";

import { WalletsForm} from "../form";

export const WalletDetailsLayout =()=> {
  const { t } = useTranslation();

  const { id } = useParams();
  const location = useLocation();
  const history = useNavigate();

  const [selectedTab, setSelectedTab] = useState(1);

 
  const wallet = ''

  const handleTabChange = (key) => {
    setSelectedTab(String(key));

    if (String(key) !== location.pathname) {
      //history.replace(String(key));
    }
  };

  return (
    <>
      <Card
        ghost={false}
        className="setter-page-header"
        onBack={() => history.goBack()}
        title={wallet?.name}
        extra={
          <Button icon={<ReloadOutlined />} >
            {t("setter.layouts.configurations.wallets.table.reload")}
          </Button>
        }
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Tabs defaultActiveKey={selectedTab} onChange={handleTabChange}>
            <Tabs.TabPane
              tab={t("setter.layouts.configurations.wallets.details.nav.info")}
              key={1}
            >
              <Skeleton paragraph={{ rows: 12 }} loading={false}>
                
                   <WalletDetailsMain/>
                </Skeleton>

            </Tabs.TabPane>
            <Tabs.TabPane
              tab={t("setter.layouts.configurations.wallets.details.nav.edit")}
              key={2}
           >
              <Skeleton paragraph={{ rows: 20 }} loading={false}>
                  <WalletsForm initialData={wallet}  />
                </Skeleton>
           </Tabs.TabPane>
          </Tabs>

         
        </Space>
      </Card>
    </>
  );
}
