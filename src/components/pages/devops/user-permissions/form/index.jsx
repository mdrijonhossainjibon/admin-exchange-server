import { useEffect, useState } from "react";
import { Col, Row, AutoComplete, Form, Button, message ,Input} from "antd";
import { useTranslation } from "react-i18next";

import { renderRows } from "../../../../../utils/component-utils";
import { UserPermissionAction, UserPermissionVerb } from "../../../../../constants/userPermissions";
import { UserRole } from "../../../../../constants/user";

export const PermissionForm = ({ initialData, onCompleted }) => {
  const [userPermissionAction, setUserPermissionAction] = useState(undefined);

  const isAudit = userPermissionAction === "AUDIT";
  const { t: translate } = useTranslation();

  const isUpdating = !!initialData;

  const t = (id) => translate(`setter.layouts.devops.userPermissions.${id}`);

  useEffect(() => {
    if (initialData?.action) {
      setUserPermissionAction(initialData.action);
    }
  }, []);

  const handleFormChange = (key, value) => {
    if (key === "action") {
      setUserPermissionAction(value);
    }
  };

  const handleSubmit = (values) => {
    // Handle form submission
  };

  const generalRows = [
    [
      <Form.Item
        name="role"
        label={t("form.role")}
        rules={[{ required: true, message: t("form.roleRequired") }]}
      >
        <AutoComplete
          options={Object.values(UserRole).map((role) => ({ label: role, value: role }))}
          placeholder={t("form.role")}
          filterOption={(inputValue, option) =>
            option?.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          }
        />
      </Form.Item>,
      <Form.Item
        name="action"
        label={t("form.action")}
        rules={[{ required: true, message: t("form.actionRequired") }]}
      >
        <AutoComplete
          options={Object.values(UserPermissionAction).map((action) => ({ label: action, value: action }))}
          placeholder={t("form.action")}
          filterOption={(inputValue, option) =>
            option?.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          }
        />
      </Form.Item>,
    ],
    [
      <Form.Item
        name="path"
        label={t("form.path")}
        rules={[{ required: true, message: t("form.pathRequired") }]}
      >
        <Input placeholder={t("form.path")} />
      </Form.Item>,
      <Form.Item
        name="verb"
        label={t("form.verb")}
        rules={[{ required: true, message: t("form.verbRequired") }]}
      >
        <AutoComplete
          options={Object.values(UserPermissionVerb).map((verb) => ({ label: verb, value: verb }))}
          placeholder={t("form.verb")}
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
       
          <Row>
            <Col span={24} className="form-section">
              <Form.Item name="topic" label={t("form.topic")}>
               <AutoComplete placeholder={t("form.topic")} />
              </Form.Item>
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
};
