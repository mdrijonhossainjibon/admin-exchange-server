import { Form, Input, Button, Select } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CurrencyType } from "../../../../../constants/currencies";
import { AdjustmentCategory } from "../../../../../constants/adjustments";
import { SelectCurrencisData } from "../../../../../modules";
import { useSelector } from "react-redux";
export const AdjustmentForm = ({ onCompleted }) => {
  const { t: translate } = useTranslation();
  const Currencis = useSelector(SelectCurrencisData)
  const [formData, setFormData] = useState();

  const t = (id) => translate(`setter.layouts.operations.adjustments.${id}`);

  const handleSubmit = (values) => {
    // Handle form submission here
  };

  let categoryOptions = Object.values(AdjustmentCategory).map((category) => ({
    value: category,
    label: t(`category.${category}`),
  }));
  

  const receiving_account_code = [];

  const setCurrencyType = (currency_id) => {
    // Handle setting currency type here
  };

  const currencyOptions = Currencis.map((el)=>{
    return { label: String(el.name), value: String(el.code) };
  })

  return (
    <Form className="setter-form" onFinish={handleSubmit}>
      <Form.Item label={t("form.currency")}>
        <Select
          name="currency_id"
          onChange={(currency_id) => {
            setCurrencyType(currency_id);
          }}
          options={currencyOptions}
        /> 
      </Form.Item>

      <Form.Item label={t("form.assetAccountCode")}>
        <Input name="asset_account_code" />
      </Form.Item>

      <Form.Item label={t("form.amount")}>
        <Input name="amount" />
      </Form.Item>

      <Form.Item label={t("form.category")}>
        <Select name="category" options={categoryOptions} >
        
        </Select>
      </Form.Item>

      <Form.Item label={t("form.reason")}>
        <Input name="reason" />
      </Form.Item>

      <Form.Item label={t("form.receivingAccountCode")}>
        <Select name="receiving_account_code">
          {/* Render your receiving_account_code options here */}
        </Select>
      </Form.Item>

      <Form.Item label={t("form.receivingMemberUid")}>
        <Input name="receiving_member_uid" />
      </Form.Item>

      {/* Render other form fields using Ant Design components */}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t("form.submit")}
        </Button>
      </Form.Item>
    </Form>
  );
};
