import React from "react";
import { Form, Input, Select, Button, DatePicker } from "antd";
import countries from "i18n-iso-countries";
import { useTranslation } from "react-i18next";

import { ProfileState } from "../../../../../../../constants/user";

const { Option } = Select;

export const ProfileForm = ({ initialValues, uid, onCompleted }) => {
  const { i18n, t: translate } = useTranslation();

  const t = (id) => translate(`setter.layouts.users.details.main.profile.${id}`);

  const handleSubmit = (values) => {
    // Handle form submission
    // You can access the form values from the 'values' parameter
  };

  const _initialValues = {
    ...initialValues,
    nationality: "nationality",
  };

  const stateOptions = Object.values(ProfileState).map((state) => ({
    value: state,
    label: t(`state.${state}`),
  }));

  countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

  const countryOptions = Object.entries(countries.getNames("en")).map(([alpha2, name]) => ({
    label: name,
    value: alpha2,
  }));

  const filterCountryOption = (inputValue, option) => {
    const label = option.label || "";
    return label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
  };

  return (
    <Form className="setter-form" onFinish={handleSubmit} initialValues={_initialValues}>
      <Form.Item name="first_name" label={t("first_name")}>
        <Input />
      </Form.Item>
      <Form.Item name="last_name" label={t("last_name")}>
        <Input />
      </Form.Item>
      <Form.Item name="dob" label={t("dob")}>
        <DatePicker showTime={false} />
      </Form.Item>
      <Form.Item name="address" label={t("address")}>
        <Input />
      </Form.Item>
      <Form.Item name="postcode" label={t("postcode")}>
        <Input />
      </Form.Item>
      <Form.Item name="city" label={t("city")}>
        <Input />
      </Form.Item>
      <Form.Item name="country" label={t("country")}>
        <Select showSearch filterOption={filterCountryOption}>
          {countryOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="state" label={t("state.title")}>
        <Select>
          {stateOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="nationality" label={t("nationality")}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t("edit")}
        </Button>
      </Form.Item>
    </Form>
  );
};
