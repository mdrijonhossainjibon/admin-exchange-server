import { useState } from "react";
import { ReloadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tooltip, Button, Space, Modal, PageHeader, Popconfirm, Card } from "antd";
import { useTranslation } from "react-i18next";
//import RestrictionForm from "./form/RestrictionForm";
import { Tag } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { RestrictionForm } from "./form";


export const Restrictions =()=> {
  const { t: translate } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(undefined);

  const t = (id) => translate(`setter.layouts.devops.restrictions.${id}`);

  


  const handleModal = (isOpen, data) => {
    setModalOpen(isOpen);
    setModalData(data);
  };

  const closeModal = () => {
    handleModal(false);
  };

  const data = [
    {
      id: 1,
      category: "Category 1",
      scope: "Scope 1",
      value: "Value 1",
      state: "State 1",
    },
    {
      id: 2,
      category: "Category 2",
      scope: "Scope 2",
      value: "Value 2",
      state: "State 2",
    },
    // Add more data objects as needed
  ];

  const columns = [
    {
      title: t("table.category"),
      dataIndex: "category",
      key: "category",
      render: (category) => {
        return <Tag>{category.toUpperCase()}</Tag>;
      },
    },
    {
      title: t("table.scope"),
      dataIndex: "scope",
      key: "scope",
    },
    {
      title: t("table.value"),
      dataIndex: "value",
      key: "value",
    },
    {
      title: t("table.state"),
      dataIndex: "state",
      key: "state",
      align: "center",
      render: (state) => {
        return <Tag>{state.toUpperCase()}</Tag>;
      },
    },
    {
      title: "",
      align: "center",
      width: 100,
      dataIndex: "actions",
      key: "actions",
      className: "actions-cell",
      render: (_, row) => (
        <Space size="middle" className="actions-container">
          <Tooltip title={t("table.edit")}>
            <Button shape="circle" icon={<EditOutlined />} onClick={() => handleModal(true, row)} />
          </Tooltip>
          <Tooltip title={t("table.delete")}>
            <Popconfirm
              title={t("delete.title")}
              onConfirm={() => {
                const variables = {
                  id: row.id,
                };
                ///deleteRestriction({ variables });
              }}
              placement="topRight"
              okText={t("delete.confirm")}
              cancelText={t("delete.cancel")}
            >
              <Button danger shape="circle" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        ghost={false}
        title={translate("setter.layouts.devops.nav.restrictions")}
        extra={[
          <Button icon={<ReloadOutlined />} >
            {t("table.reload")}
          </Button>,
          <Button type="primary" onClick={() => setModalOpen(true)}>
            + {t("table.new")}
          </Button>,
        ]}
      />
      <Table
      
        dataSource={data}
        rowKey="id"
        columns={columns}
       
      />
      <Modal
        title={t("form.title")}
        visible={isModalOpen}
        onCancel={() => handleModal(false)}
        footer={null}
        destroyOnClose={true}
      >
        <RestrictionForm initialData={modalData}/>
      </Modal>
    </>
  );
}
