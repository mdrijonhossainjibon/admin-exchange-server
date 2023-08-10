import { Col, Row, AutoComplete, Form, Button, message, Tag,Input } from "antd";
import { useTranslation } from "react-i18next";


// import CurrencyOptionForm from "./CurrencyOptionForm";
import { renderRows } from "../../../../../utils/component-utils";
import { RestrictionCategory, RestrictionScope, RestrictionState } from "../../../../../constants/restrictions";




export const RestrictionForm =({ initialData, onCompleted }) => {
  const { t: translate } = useTranslation();

  const isUpdating = !!initialData;

  const t = (id) => translate(`setter.layouts.devops.restrictions.${id}`);

 

 

  const handleSubmit = (values) => {
   
  };

  const generalRows = [
    [
      <Form.Item
        name="category"
        label={t("form.category")}
        rules={[{ required: true, message: t("form.categoryRequired") }]}
      >
        <AutoComplete
          options={Object.values(RestrictionCategory).map((category) => ({ label: category, value: category }))}
          placeholder={t("form.category")}
          filterOption={(inputValue, option) =>
            option?.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          }
        />
      </Form.Item>,
    ],
    [
      <Form.Item
        name="scope"
        label={t("form.scope")}
        rules={[{ required: true, message: t("form.scopeRequired") }]}
      >
        <AutoComplete
          options={Object.values(RestrictionScope).map((scope) => ({ label: scope, value: scope }))}
          placeholder={t("form.scope")}
          filterOption={(inputValue, option) =>
            option?.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          }
        />
      </Form.Item>,
    ],
    [
      <AutoComplete
        name="value"
        label={t("form.value")}
        rules={[{ required: true, message: t("form.valueRequired") }]}
      >
        <Input placeholder={t("form.value")} />
      </AutoComplete>,
    ],
    [
      <Form.Item
        name="state"
        label={t("form.state")}
        rules={[{ required: true, message: t("form.stateRequired") }]}
      >
        <AutoComplete
          options={Object.values(RestrictionState).map((state) => ({ label: state, value: state }))}
          placeholder={t("form.state")}
          filterOption={(inputValue, option) =>
            option?.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          }
        />
      </Form.Item>,
    ],
  ];

  return (
    <>
      <Form className="setter-form" layout="vertical" initialValues={initialData} onFinish={handleSubmit}>
        <Row gutter={24}>
          <Col span={24} className="form-section">
            {renderRows(generalRows)}
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
           
          >
            {isUpdating ? t("form.update") : t("form.create")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
