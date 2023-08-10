
import { Descriptions, Badge, List, Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useDate } from "../../../../../../utils/hooks";
import { useNavigate } from "react-router-dom";

export const MarketDetailsMain =() =>{
  const { t: translate } = useTranslation();
  const { formatDate } = useDate();
  const history = useNavigate();
  const goToCurrencyDetails = (code) => {
    //history.push(Routes.withParams.CurrenciesDetails({ code }));
  };

  const t = (id) => translate(`setter.layouts.configurations.markets.details.${id}`);
  //if (!market) return <></>;

  const market = {
    name: "BTC/USD",
    created_at: new Date(),
    updated_at: new Date(),
    base_currency: {
      name: "Bitcoin",
      visible: false,
    },
    base_unit: "BTC",
    quote_currency: {
      name: "US Dollar",
      visible: true,
    },
    quote_unit: "USD",
    amount_precision: 8,
    price_precision: 2,
    max_price: 50000,
    min_price: 10000,
    min_amount: 0.001,
    position: "1",
  };

  

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
                  onClick={() => goToCurrencyDetails('market.base_unit')}
                />
              }
            >
              <List.Item.Meta
                title={
                  <Badge
                    status={market.base_currency?.visible ? "success" : "error"}
                    text={`${market.base_currency?.name} (${market.base_unit.toUpperCase()})`}
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
                  onClick={() => goToCurrencyDetails('market.quote_unit')}
                />
              }
            >
              <List.Item.Meta
                title={
                  <Badge
                    status={'market.quote_currency?.visible '? "success" : "error"}
                    text={`${market.quote_currency?.name} (${market.quote_unit.toUpperCase()})`}
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
