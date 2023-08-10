import { Form, Input, Select, Button } from 'antd';
import { useTranslation } from 'react-i18next';

export const FeesScheduleForm = ({ initialData, onCompleted }) => {
  const { t: translate } = useTranslation();

  const t = (id) => translate(`setter.layouts.configurations.feesSchedule.form.${id}`);

  const isUpdating = !!initialData;

  const marketOptions = [{ label: 'any', value: 'any' }];

  const handleSubmit = (values) => {
    let variables = values;
    // Handle form submission
    // ...
  };

  return (
    <Form className="setter-form" initialValues={initialData} onFinish={handleSubmit}>
      <Form.Item label={t("group")} name="group">
        <Input />
      </Form.Item>
      <Form.Item label={t("market_id")} name="market_id">
        <Select options={marketOptions} />
      </Form.Item>
      <Form.Item label={t("maker")} name="maker">
        <Input />
      </Form.Item>
      <Form.Item label={t("taker")} name="taker">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isUpdating ? t("edit") : t("create")}
        </Button>
      </Form.Item>
    </Form>
  );
};
