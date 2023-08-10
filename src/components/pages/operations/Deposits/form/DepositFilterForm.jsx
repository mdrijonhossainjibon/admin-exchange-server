import { useRef } from "react";
import { Form, Button, Row ,Select,Input,DatePicker} from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { CurrencyType } from "../../../../../constants/currencies";
import { DepositState } from "../../../../../constants/deposits";
import { useTranslation } from "react-i18next";

export const DepositFilterForm = ({ onSubmit, loading }) => {
  const formRef = useRef(null);
  const { t: translate } = useTranslation();

  const t = (id) => translate(`setter.layouts.operations.deposits.filter.${id}`);

  const handleSubmit = (values) => {
    // Handle form submission here
  };

  const handleReset = () => {
    formRef?.current?.resetFields();
  };

  const currencyOptions = [];

  return (
    <Form
      className="setter-form"
      ref={formRef}
      style={{ minWidth: "320px" }}
      onFinish={handleSubmit}
    >
      <Form.Item label={t("state")} name="state">
        <Select>
          {Object.values(DepositState).map((state) => (
            <Select.Option key={state} value={state}>
              {state}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label={t("uid")} name="uid">
        <Input />
      </Form.Item>
      <Form.Item label={t("txid")} name="txid">
        <Input />
      </Form.Item>
      <Form.Item label={t("address")} name="address">
        <Input />
      </Form.Item>
      <Form.Item label={t("currency")} name="currency">
        <Select options={currencyOptions} />
      </Form.Item>
      <Form.Item label={t("currencyType")} name="type">
        <Select>
          {Object.values(CurrencyType).map((currencyType) => (
            <Select.Option key={currencyType} value={currencyType}>
              {currencyType}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label={t("from")} name="from">
        <DatePicker showTime={false} />
      </Form.Item>
      <Form.Item label={t("to")} name="to">
        <DatePicker showTime={false} />
      </Form.Item>
      <Row>
        <Button style={{ margin: 0 }} htmlType="submit" type="primary" loading={loading}>
          {t("submit")}
        </Button>
        <Button style={{ marginLeft: "auto" }} onClick={handleReset} icon={<ReloadOutlined />}>
          {t("reset")}
        </Button>
      </Row>
    </Form>
  );
};
