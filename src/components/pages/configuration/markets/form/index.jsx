import { Col, Row, Skeleton, Select ,Form,InputNumber,Button,Switch,DatePicker, Input} from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import moment from 'moment';
import { Currency_Fecth,SelectCurrencisData } from "../../../../../modules";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

export const MarketsForm = ({initialData}) => {
  const { t: translate } = useTranslation();
  const { id } = useParams();
  const [inputValue, setInputValue] =useState('')
  const isUpdating = !!initialData;
  const dispach = useDispatch();
  const t = (id) => translate(`setter.layouts.configurations.markets.form.${id}`);
  const handleSubmit = (values) => {
    const variables = values;
    console.log(variables)
  };
  useEffect(()=>{
   dispach(Currency_Fecth());
  },[dispach]);
  const Currencis = useSelector(SelectCurrencisData)

  const handleDatePicker = (data)=>{
    console.log(data.valueOf())
    const date = new Date(data.valueOf());

const options = {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
};

const formattedDate = date.toLocaleString('en-US', options);
console.log(formattedDate);
setInputValue(formattedDate)
  }
  const currencyOptions = Currencis.map((el)=>{
    return { label: String(el.name), value: String(el.code) };
  })

  
  const formRows = [
    [
      <Col span={12} key="base_currency">
        <Form.Item
          label={t("base_currency")}
          name="base_currency"
          initialValue={initialData?.base_currency}
          rules={[{ required: true, message: "Base currency is required" }]}
        >
          <Select disabled={isUpdating} getPopupContainer={(node) => node.parentNode}>
            {currencyOptions.map((currency) => (
              <Option key={currency.value} value={currency.value}>
                {currency.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>,
      <Col span={12} key="quote_currency">
        <Form.Item
          label={t("quote_currency")}
          name="quote_currency"
          initialValue={initialData?.quote_currency}
          rules={[{ required: true, message: "Quote currency is required" }]}
        >
          <Select disabled={isUpdating} getPopupContainer={(node) => node.parentNode}>
            {currencyOptions.map((currency) => (
              <Option key={currency.value} value={currency.value}>
                {currency.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    ],
    [
      <Col span={12} key="amount_precision">
        <Form.Item
          label={t("amount_precision")}
          name="amount_precision"
          initialValue={initialData?.amount_precision}
          rules={[{ required: true, message: "Amount precision is required" }]}
        >
          <InputNumber disabled={isUpdating} min={0} step={1} precision={0} />
        </Form.Item>
      </Col>,
      <Col span={12} key="price_precision">
        <Form.Item
          label={t("price_precision")}
          name="price_precision"
          initialValue={initialData?.price_precision}
          rules={[{ required: true, message: "Price precision is required" }]}
        >
          <InputNumber disabled={isUpdating} min={0} step={1} precision={0} />
        </Form.Item>
      </Col>,
      <Col span={12} key="max_price">
      <Form.Item
        label={t("max_price")}
        name="max_price"
        initialValue={initialData?.max_price}
        rules={[{ required: true, message: "Max price is required" }]}
      >
        <InputNumber disabled={isUpdating} min={0} step={1} precision={2} />
      </Form.Item>
    </Col>,
    <Col span={12} key="min_price">
    <Form.Item
      label={t("min_price")}
      name="min_price"
      initialValue={initialData?.min_price}
      rules={[{ required: true, message: "Min price is required" }]}
    >
      <InputNumber disabled={isUpdating} min={0} step={1} precision={2} />
    </Form.Item>
  </Col>,
  <Col span={12} key="min_amount">
  <Form.Item
    label={t("min_amount")}
    name="min_amount"
    initialValue={initialData?.min_amount}
    rules={[{ required: true, message: "Min amount is required" }]}
  >
    <InputNumber disabled={isUpdating} min={0} step={1} precision={2} />
  </Form.Item>
</Col>,<Col span={12} key="position">
  <Form.Item
    label={t("position")}
    name="position"
    initialValue={initialData?.position}
    rules={[{ required: true, message: "Position is required" }]}
  >
    <InputNumber disabled={isUpdating} min={0} step={1} precision={0} />
  </Form.Item>
</Col>,
<Col span={12} key="enabled">
  <Form.Item
    label={t("enabled")}
    name="enabled"
    initialValue={initialData?.enabled}
    rules={[{ required: true, message: "Enabled is required" }]}
    valuePropName="checked"
  >
    <Switch disabled={isUpdating} />
  </Form.Item>
</Col>,
 <Col span={24} key="trading_start_countdown">
 <Form.Item
   label={"trading_start_countdown"}
   name="trading_start_countdown"
   initialValue={initialData?.trading_start_countdown}
   rules={[{ required: true, message: "Trading start countdown is required" }]}
 > 
   <DatePicker   onSelect={handleDatePicker} defaultValue={moment(1687510270140)}  inputReadOnly/>
 </Form.Item>
</Col>
      
    ],
    // Rest of the form fields
  ];

  return (
    <Form className="setter-form" onFinish={handleSubmit} initialValues={initialData}>
      <Skeleton loading={false} active paragraph={{ rows: 9 }}>
        <Row gutter={24}>{formRows}</Row>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            
          >
            {isUpdating ? t("update") : t("create")}
          </Button>
        </Form.Item>
      </Skeleton>
    </Form>
  );
};
