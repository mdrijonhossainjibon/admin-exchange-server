import { useState } from "react";
import { useNavigate} from "react-router-dom";


import { Tooltip, Button, Space, Modal, Card ,Table} from "antd";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import{ FeesScheduleForm } from "./FeesScheduleForm";
import { useTranslation } from "react-i18next";

export const FeesSchedule =() =>{
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(undefined);
  const { t: translate } = useTranslation();
  const history = useNavigate();

  const t = (id) => translate(`setter.layouts.configurations.feesSchedule.${id}`);

  

  const handleModal = (isOpen, data) => {
    setModalOpen(isOpen);
    setModalData(data);
  };

  const handleDelete = (fee) => {
    Modal.confirm({
      maskClosable: true,
      title: t("delete.title"),
      icon: <ExclamationCircleOutlined />,
      okText: t("delete.confirm"),
      cancelText: t("delete.cancel"),
      onOk: () => {
        console.log("confirm delete", fee.id);
      },
    });
  };
  
  const data = [
    { id: 1, group: 'VIP 0', market_id: 'BTC-UST', maker: '1%', taker: '2%' },
    { id: 2, group: 'VIP 1', market_id: 'ASD-LUB', maker: '0.%', taker: 'Bob' },
  ];

  const columns = [
    { title: t("table.id"), dataIndex: "id", key: "id" },
    { title: t("table.group"), dataIndex: "group", key: "group" },
    { title: t("table.market"), dataIndex: "market_id", key: "market_id" },
    { title: t("table.maker"), dataIndex: "maker", key: "maker" },
    { title: t("table.taker"), dataIndex: "taker", key: "taker" },
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
            <Button shape="circle" icon={<DeleteOutlined />} onClick={() => handleDelete(row)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        ghost={false}
        className="setter-page-header"
        title={translate("setter.layouts.configurations.nav.feesSchedule")}
        extra={<Space>
          <Button icon={<ReloadOutlined />}>
            {t("table.reload")}
          </Button>
          <Button type="primary" onClick={() => setModalOpen(true)}>
            + {t("table.new")}
          </Button>
        </Space>}
      >
        <Table
          bordered
          className="fees-schedule-table"
          columns={columns}
          loading={false}
          dataSource={data}
          rowKey="id"
          pagination={{
            position: ["bottomLeft"],
            total: 1,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
         
        />
        <Modal
          title={modalData ? t("form.edit") : t("form.create")}
          visible={isModalOpen}
          onCancel={() => handleModal(false)}
          footer={null}
          destroyOnClose={true}
        >
           <FeesScheduleForm initialData={modalData} onCompleted={() => handleModal(false)} />
        </Modal>
      </Card>
    </>
  );
}
