import { Tag } from "antd";
import { BlockOutlined, BankOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";


export const DepositType =({ type }) => {
  const { t: translate } = useTranslation();
  const t = (id) => translate(`setter.layouts.operations.deposits.${id}`);

  switch (type) {
    case "coin":
      return (
        <Tag color="geekblue" icon={<BlockOutlined />}>
          {t(`table.${type}`)}
        </Tag>
      );
    case "fiat":
      return (
        <Tag color="purple" icon={<BankOutlined />}>
          {t(`table.${type}`)}
        </Tag>
      );
  }
  return null;
}
