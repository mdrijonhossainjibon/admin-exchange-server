import { useEffect, useState } from "react";
import { Button,  Card, Tabs } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";
import { OrderFetchType, OrderState } from "../../../../constants/orders";
import{ OrderTable }from "./OrderTable";

import { useNavigate} from "react-router-dom";

export const Orders =() =>{
  const [type, setType] = useState(OrderFetchType.Open);
  const { t: translate } = useTranslation();

  const t = (id) => translate(`setter.layouts.operations.orders.${id}`);
  const history =  useNavigate();
 

  const [filter, setFilter] = useState(undefined);

  

  useEffect(() => setFilter({}), [type]);

  const changeFilter = (filter) => {
    setFilter(filter);
  };

  const panes = [
    { tab: t("table.panes.open"), key: OrderFetchType.Open },
    { tab: t("table.panes.history"), key: OrderFetchType.History },
  ];

  const headerExtra = (
    <Button icon={<ReloadOutlined />} >
      {t("table.reload")}
    </Button>
  );
const data = [
  { id: 1, user: { email: 'user1@example.com' }, market: { name: 'BTC-USDT' }, origin_volume: 10, executed_volume: 5, price: 100, side: 'Buy', ord_type: 'limit', created_at: new Date(), state: 'Wait' },
  { id: 2, user: { email: 'user2@example.com' }, market: { name: 'LTC-USDT' }, origin_volume: 20, executed_volume: 15, price: 200, side: 'Sell', ord_type: 'market', created_at: new Date(), state: 'completed' },
]
  return (
    <>
      <Card
        className="setter-page-header"
        ghost={false}
        title={translate("setter.layouts.operations.nav.orders")}
        extra={headerExtra}
      >
        <Tabs defaultActiveKey={type} onChange={(key) => setType(key)}>
          {panes.map((pane) => (
            <Tabs.TabPane {...pane} >
              <OrderTable  orders={data} openOrders={data}/>
            </Tabs.TabPane>
          ))}
        </Tabs>

       
      </Card>
    </>
  );
}
