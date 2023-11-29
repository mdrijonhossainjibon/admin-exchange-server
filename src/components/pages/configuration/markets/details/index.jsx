import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader, Tabs, Skeleton, Button, Space, Card } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useParams, useLocation,  useNavigate } from "react-router-dom";
import { MarketDetailsMain } from "./main";
import { MarketsForm }from "../form";

export const MarketDetailsLayout =()=> {
  const { t } = useTranslation();

  const { id } = useParams();
  const location = useLocation();
  const history = useNavigate();

  const [selectedTab, setSelectedTab] = useState(1);


  const market = {
    "id": "arnmatic",
"name": "ARN/MATIC",
"base_unit": "ARN",
"quote_unit": "MATIC",
"min_price": 0,
"max_price": 1,
"min_amount": 1,
"amount_precision": 1,
"price_precision": 1,
"state": false,
"created_at": "2023-09-27T11:41:07.183Z",
"filters": []

  }

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
        
        title={market?.name}
        extra={
          <Button icon={<ReloadOutlined />} >
            {t("setter.layouts.configurations.markets.table.reload")}
          </Button>
        }
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Tabs defaultActiveKey={selectedTab} onChange={handleTabChange}>
            <Tabs.TabPane
              tab={t("setter.layouts.configurations.markets.details.nav.info")}
              key={1}
            >
                <Skeleton loading={false} paragraph={{ rows: 9 }} active>
                 < MarketDetailsMain />
                </Skeleton>
              
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={t("setter.layouts.configurations.markets.details.nav.edit")}
              key={2}
            >
                <Skeleton paragraph={{ rows: 11 }} active loading={false}>
                 <MarketsForm />
                </Skeleton>
            </Tabs.TabPane>
          </Tabs>

         
        </Space>
      </Card>
    </>
  );
}
