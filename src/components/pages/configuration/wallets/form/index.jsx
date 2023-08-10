import { useState } from "react";
import { Col, Descriptions, Row, Skeleton, Card, Form, Input, Button ,Select} from "antd";
import { useParams } from "react-router-dom";
import { renderRows } from "../../../../../utils/component-utils";
//import { CurrencyType } from "../../../../../constants/currencies";
import { WalletKind } from "../../../../../constants/wallets";
import { useTranslation } from "react-i18next";

const SubmitType = {
  General: "general",
  Settings: "settings",
};

export const WalletsForm = ({ initialData, onCompleted }) => {
  const [submitType, setSubmitType] = useState(undefined);
  const [walletKind, setWalletKind] = useState(undefined);
  const { id } = useParams();
  const { t: translate } = useTranslation();

  const t = (id) => translate(`setter.layouts.configurations.wallets.form.${id}`);

  const isUpdating = !!initialData;

  const blockchainOptions = [];

  const gatewaysOptions = [];

  const currencyOptions = [];

  const handleSubmit = async (values) => {
    const settings = { uri: values.uri };

    if (values.secret) {
      settings.secret = values.secret;
    }

    if (values.gateway === "bitgo") {
      settings.access_token = values.access_token;
      settings.testnet = values.testnet;
      settings.wallet_id = values.wallet_id;
    }

    const variables = {
      ...values,
      settings: JSON.stringify(settings),
    };

    if (submitType === SubmitType.Settings) {
    } else {
    }

    setSubmitType(undefined);
  };

  const handleFormChange = (key, value) => {
    if (key === "kind") {
      setWalletKind(value);
    }
  };

  const parseInitialData = () => {
    if (initialData) {
      return {
        ...initialData,
        uri: initialData?.settings?.uri,
        secret: initialData?.settings?.secret,
        currency: initialData.currency_code,
        max_balance: Number(initialData.max_balance),
        testnet: initialData?.settings?.testnet,
        access_token: initialData?.settings?.access_token,
        wallet_id: initialData?.settings?.wallet_id,
      };
    }

    return undefined;
  };

  const formRows = [
    [
      <Form.Item label={t("enabled")} name="enabled">
        <Input />
      </Form.Item>
    ],
    [
      <Form.Item label={t("name")} name="name">
        <Input />
      </Form.Item>
    ],
    [
      <Form.Item label={t("currency")} name="currency">
        <Select options={currencyOptions} />
      </Form.Item>,
      <Form.Item label={t("blockchain_key")} name="blockchain_key">
        <Select options={blockchainOptions} />
      </Form.Item>
    ],
    [
      <Form.Item label={t("kind")} name="kind">
        <Select allowedValues={Object.values(WalletKind)} />
      </Form.Item>,
      <Form.Item label={t("gateway")} name="gateway">
        <Select options={gatewaysOptions} />
      </Form.Item>
    ],
    [
      <Form.Item label={t("address")} name="address">
        <Input style={{ width: "100%" }} />
      </Form.Item>
    ],
    [
      <Form.Item label={t("max_balance")} name="max_balance">
        <Input />
      </Form.Item>,
      []
    ]
  ];

  console.log(WalletKind.Cold, WalletKind.Deposit, walletKind);

  const settingsRows = [
    [
      <Form.Item label={t

("settings.uri")} name="uri">
        <Input />
      </Form.Item>,
      ![
        WalletKind.Cold,
        WalletKind.Deposit,
        undefined
      ].includes(walletKind ? walletKind : parseInitialData()?.kind) && (
        <Form.Item label={t("settings.secret")} name="secret">
          <Input.Password />
        </Form.Item>
      )
    ],
    [
      parseInitialData()?.gateway === "bitgo" && (
        <Form.Item label={t("settings.accessToken")} name="access_token">
          <Input />
        </Form.Item>
      )
    ],
    [
      parseInitialData()?.gateway === "bitgo" && (
        <Form.Item label={t("settings.testnet")} name="testnet">
          <Input />
        </Form.Item>
      )
    ],
    [
      parseInitialData()?.gateway === "bitgo" && (
        <Form.Item label={t("settings.walletId")} name="wallet_id">
          <Input />
        </Form.Item>
      )
    ]
  ];

  const generalSubmitField = (
    <Button onClick={() => setSubmitType(SubmitType.General)} disabled={false}>
      {isUpdating ? t("update") : t("create")}
    </Button>
  );

  const settingsSubmitField = (
    <Button onClick={() => setSubmitType(SubmitType.Settings)} disabled={false}>
      {t("settings.submit")}
    </Button>
  );

  const formColStyle = {
    flex: 1,
    minWidth: "320px"
  };

  return (
    <>
      <Form
        className="setter-form"
        onFinish={handleSubmit}
        initialValues={parseInitialData()}
        onValuesChange={handleFormChange}
      >
        <Skeleton paragraph={{ rows: 10 }} loading={false}>
          <Row gutter={[24, 16]}>
            <Col style={formColStyle}>
              <Card>
                <Descriptions title={t("title")} style={{ marginBottom: "1rem" }}>
                  <Descriptions.Item>
                    <Row gutter={24} style={{ width: "100%" }}>
                      <Col span={24}>{renderRows(formRows)}</Col>
                    </Row>
                    {isUpdating && generalSubmitField}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col style={formColStyle}>
              <Card>
                <Descriptions title={t("settings.title")}>
                  <Descriptions.Item>
                    <Row gutter={24}>
                      <Col span={24}>
                        {renderRows(settingsRows)}
                        <br />
                        {isUpdating && settingsSubmitField}
                      </Col>
                    </Row>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
          {!isUpdating && generalSubmitField}
        </Skeleton>
      </Form>
    </>
  );
};