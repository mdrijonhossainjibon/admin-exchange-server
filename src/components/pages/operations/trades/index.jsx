import { useState } from "react";
import { TradeTable }from "./TradeTable";
import { Button, Card} from "antd";
import { useTranslation } from "react-i18next";
import {  useNavigate } from "react-router-dom";

import { ReloadOutlined } from "@ant-design/icons";

export const Trades =() =>{
  const { t } = useTranslation();

  const history = useNavigate();

  const [filter, setFilter] = useState();

  

  const changeFilter = (filter) => {
    setFilter(filter);
  };

  return (
    <>
      <Card
        title={t("setter.layouts.operations.nav.trades")}
        ghost={false}
        className="setter-page-header"
        extra={[
          <Button icon={<ReloadOutlined />} >
            {t("reload")}
          </Button>,
        ]}
      >
        <TradeTable />
      </Card>
    </>
  );
}
