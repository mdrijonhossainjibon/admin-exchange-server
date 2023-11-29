
import { Descriptions, Badge, List, Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useDate } from "../../../../../../utils/hooks";
import { useNavigate } from "react-router-dom";
import { APIREQ, API_CALL_ENDPOINT } from "../../../../../../api";
import { useState } from "react";

export const MarketDetailsMain =() =>{
  const { t: translate } = useTranslation();
  const { formatDate } = useDate();
  const history = useNavigate();
  const goToCurrencyDetails = (code) => {
    history({pathname : '/configuration/currencies/details/'+code});
  };

  const t = (id) => translate(`setter.layouts.configurations.markets.details.${id}`);
  //if (!market) return <></>;

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

  return (
    <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
      <Descriptions.Item label={t("name")}>
        <Badge status={market.enabled ? "success" : "error"} text={market.name} />
      </Descriptions.Item>

      <Descriptions.Item label={t("dates")}>
        <div>
          {t("created")}: {formatDate(market.created_at)}
        </div>
        <div>
          {t("updated")}: {formatDate(market.updated_at)}
        </div>
      </Descriptions.Item>

      <Descriptions.Item label={t("base_unit")}>
        <List
          itemLayout="horizontal"
          dataSource={[market]}
          renderItem={(market) => (
            <List.Item
              extra={
                <Button
                  shape="circle"
                  icon={<EllipsisOutlined />}
                  onClick={() => goToCurrencyDetails(market.base_unit)}
                />
              }
            >
              <List.Item.Meta
                title={
                  <Badge
                    status={'market.base_currency?.visible' ? "success" : "error"}
                    text={`${market.base_unit} (${market.base_unit.toUpperCase()})`}
                  />
                }
              />
            </List.Item>
          )}
        />
      </Descriptions.Item>
      <Descriptions.Item label={t("quote_unit")}>
        <List
          itemLayout="horizontal"
          dataSource={[market]}
          renderItem={(market) => (
            <List.Item
              extra={
                <Button
                  shape="circle"
                  icon={<EllipsisOutlined />}
                  onClick={() => goToCurrencyDetails(market.quote_unit)}
                />
              }
            >
              <List.Item.Meta
                title={
                  <Badge
                    status={'market.quote_currency?.visible '? "success" : "error"}
                    text={`${market.base_unit} (${market.quote_unit.toUpperCase()})`}
                  />
                }
              />
            </List.Item>
          )}
        />
      </Descriptions.Item>
      <Descriptions.Item label={t("amount_precision")}>{market.amount_precision}</Descriptions.Item>
      <Descriptions.Item label={t("price_precision")}>{market.price_precision}</Descriptions.Item>
      <Descriptions.Item label={t("max_price")}>{market.max_price}</Descriptions.Item>
      <Descriptions.Item label={t("min_price")}>{market.min_price}</Descriptions.Item>
      <Descriptions.Item label={t("min_amount")}>{market.min_amount}</Descriptions.Item>
      <Descriptions.Item label={t("position")}>{market.position}</Descriptions.Item>
    </Descriptions>
  );
}
