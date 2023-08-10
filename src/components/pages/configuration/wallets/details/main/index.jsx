import { Descriptions, Badge, List, Button } from "antd";
import { useTranslation } from "react-i18next";
import { EllipsisOutlined, LinkOutlined } from "@ant-design/icons";
import { useDate } from "../../../../../../utils/hooks";
import { useNavigate } from "react-router-dom";
const wallet = {
  name: "My Wallet",
  created_at: "2022-12-01",
  updated_at: "2023-06-15",
  addresses: [
    {
      address: "0x35e46238c6ea3d0cfa84A593e47E50D70808d17c",
    },
    {
      address: "0x35e46238c6ea3d0cfa84A593e47E50D70808d17c",
    },
  ],
  blockchains: [
    {
      id: 1,
      name: "Ethereum",
      key: "ethereum",
      enabled: true,
    },
    {
      id: 2,
      name: "Bitcoin",
      key: "bitcoin",
      enabled: false,
    },
  ],
  currencies: [
    {
      code: "usd",
      name: "US Dollar",
      visible: true,
    },
    {
      code: "eur",
      name: "Euro",
      visible: false,
    },
  ],
  kind: "software",
  gateway: "Example Gateway",
  settings: {
    access_token: "abc123",
    testnet: false,
    wallet_id: "xyz789",
  },
  max_balance: 1000,
};


export const WalletDetailsMain =() => {
  const { t: translate } = useTranslation();
  const { formatDate } = useDate();
  const history = useNavigate;
  const goToCurrencyDetails = (code) => {
    //history.push(Routes.withParams.CurrenciesDetails({ code }));
  };
  const goToBlockchainDetails = (id) => {
    ///history.push(Routes.withParams.BlockchainsDetails({ id }));
  };

  const t = (id) => translate(`setter.layouts.configurations.wallets.details.${id}`);
  ///if (!wallet) return <></>;



  return (
    <Descriptions bordered column={2}>
      <Descriptions.Item label={t("name")}>
        <Badge status={ "error"} text={ t("disabled")} />
        <div>{wallet.name}</div>
      </Descriptions.Item>
      <Descriptions.Item label={t("dates")}>
        <div>
          {t("created")}: {formatDate(wallet.created_at)}
        </div>
        <div>
          {t("updated")}: {formatDate(wallet.updated_at)}
        </div>
      </Descriptions.Item>
      <Descriptions.Item label={t("address")}>
        <List
          itemLayout="horizontal"
          dataSource={wallet.addresses}
          renderItem={(c) => (
            <List.Item
              extra={
                <Button
                  shape="circle"
                  target="_blank"
                  icon={<LinkOutlined />}
                  href={''}
                />
              }
            >
              <List.Item.Meta title={`${c.address}`} />
            </List.Item>
          )}
        />
      </Descriptions.Item>
      <Descriptions.Item label={t("blockchain_key")}>
        <List
          itemLayout="horizontal"
          dataSource={wallet.blockchains}
          renderItem={(c) => (
            <List.Item>
              <List.Item.Meta
                title={<Badge status={c.enabled ? "success" : "error"} text={`${c.name} (${c.key})`} />}
              />
              <Button shape="circle" icon={<EllipsisOutlined />} onClick={() => goToBlockchainDetails('c.id')} />
            </List.Item>
          )}
        />
      </Descriptions.Item>
      <Descriptions.Item label={t("currency")}>
        <List
          itemLayout="horizontal"
          dataSource={wallet.currencies}
          renderItem={(c) => (
            <List.Item
              extra={<Button shape="circle" icon={<EllipsisOutlined />} onClick={() => goToCurrencyDetails('c.code')} />}
            >
              <List.Item.Meta
                title={<Badge status={c.visible ? "success" : "error"} text={`${c.name} (${c.code?.toUpperCase()})`} />}
              />
            </List.Item>
          )}
        />
      </Descriptions.Item>
      <Descriptions.Item label={t("kind")}>{wallet.kind}</Descriptions.Item>
      <Descriptions.Item label={t("gateway")}>
        
          <List>
            <List.Item>{wallet.gateway}</List.Item>
            <List.Item>
              <List.Item.Meta title={t("accessToken")} description={wallet.settings?.access_token} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title={t("testnet")} description={wallet.settings?.testnet ? "true" : "false"} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title={t("walletId")} description={wallet.settings?.wallet_id} />
            </List.Item>
          </List>
        
      </Descriptions.Item>
      <Descriptions.Item label={t("max_balance")}>{wallet.max_balance}</Descriptions.Item>
    </Descriptions>
  );
}
