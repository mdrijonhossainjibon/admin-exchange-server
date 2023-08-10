import { useDate } from "../../../../../../utils/hooks";
import { useTranslation } from "react-i18next";

import { LabelKey, LabelScope, LabelValue } from "../../../../../../constants/user";
import { Descriptions, Space, Switch, Typography } from "antd";

export const KYCVerification =({ user }) => {
  const { formatDate } = useDate();
  const { t  } = useTranslation();

  //const t = (ii, vars) => translate(`setter.layouts.users.details.kyc.verification.${id}`, vars);

  
 


  const kycItems = [
    { name: `${t("email")} (${t("level", { level: 1 })})`, key: LabelKey.Email },
    { name: `${t("phone")} (${t("level", { level: 2 })})`, key: LabelKey.Phone },
    { name: `${t("document")} (${t("level", { level: 3 })})`, key: LabelKey.Document },
  ];

  return (
    <Descriptions
      title={
        <Space align="baseline">
          <div>{t("title")}</div>
          <Typography.Text type="secondary">{t("level", { level: user.level })}</Typography.Text>
        </Space>
      }
      column={1}
      bordered
    >
      {kycItems.map((item) => {
        const label = '0' //isLabelVerified(item.key);
        const checked = ''//!!label;
        //const onChange = ''///handleToggle(item.key);

        const labelText = (
          <>
            <div>{item.name}</div>
            <Typography.Text type="secondary" style={{ fontWeight: 400 }}>
              {label ? t("verified", { date: formatDate(label.updated_at) }) : t("notVerified")}
            </Typography.Text>
          </>
        );

        return (
          <Descriptions.Item key={item.key} label={labelText} style={{ width: "70%" }}>
            <Switch  />
          </Descriptions.Item>
        );
      })}
    </Descriptions>
  );
}
