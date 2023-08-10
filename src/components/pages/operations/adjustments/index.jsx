import { useEffect, useState } from "react";
import { EllipsisOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Modal,Card, Select, Space, Table, Tag } from "antd";

import { AdjustmentAction, AdjustmentCategory, AdjustmentState } from "../../../../constants/adjustments";
import{ AdjustmentForm }from "./form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { WithdrawState } from "../../../../constants/withdraws";

const adjustmentStateColors = {
  [AdjustmentState.Accepted]: "success",
  [AdjustmentState.Pending]: "warning",
  [AdjustmentState.Rejected]: "error",
};

export const  Adjustments =() =>{
  const [isModalOpen, setModalOpen] = useState(false);
  const history = useNavigate();
  const { t: translate } = useTranslation();

  const t = (id) => translate(`setter.layouts.operations.adjustments.${id}`);

  const goToAdjustmentDetails = (id) => {
    
  };

  
  const [filter, setFilter] = useState();

 const currencyData = []
 
  const currency_codeFilters = currencyData.map((el) => {
    return { text: `${String(el.code.toUpperCase())}`, value :el.code };
  });

  const stateFilters = Object.values(WithdrawState).map((el) => {
    return { text :el ,  value : el };
  });

  const changeFilter = (filter) => {
    setFilter(filter);
  };
  
  const data = [
    {
      id: 1,
      receiving_member: {
        uid: "ABC123",
      },
      reason: "Adjustment 1",
      amount: 100,
      currency: {
        code: "USD",
      },
      category: "refund",
      creator: {
        uid: "JohnDoe",
      },
      receiving_account_code: "123456",
      state: "Approved",
    },
    {
      id: 2,
      receiving_member: {
        uid: "DEF456",
      },
      reason: "Adjustment 2",
      amount: 200,
      currency: {
        code: "EUR",
      },
      category: "refund",
      creator: {
        uid: "JaneSmith",
      },
      receiving_account_code: "789012",
      state: "Pending",
    },
    // Add more data objects as needed
  ];

  const categoryFilters = [
    ...Object.values(AdjustmentCategory).map((category) => ({
      text: t(`category.${category}`),
      value: category,
    }))
  ];
  

  const columns = [
    {
      title: t("table.id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("table.uid"),
      dataIndex: ["receiving_member", "uid"],
      key: "receiving_member.uid",
    },
    {
      title: t("table.reason"),
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: t("table.amount"),
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: t("table.currency"),
      dataIndex: ["currency", "code"],
      key: "currency",
      filters: currency_codeFilters,
      filterMultiple: false,
      filtered: filter && filter.currency ? true : false,
      filteredValue: filter && filter.currency ? [filter.currency] : [],
      render: (value) => value.toUpperCase(),
    },
    {
        title: t("table.category"),
        dataIndex: "category",
        key: "category",
        filters: categoryFilters,
        filterMultiple: true,
        filtered: filter && filter.category ? true : false,
        filteredValue: filter && filter.category ? filter.category : [],
        render: (category) => t(`category.${category}`),
      },
    {
      title: t("table.creator"),
      dataIndex: ["creator", "uid"],
      key: "creator.uid",
    },
    {
      title: t("table.receivingAccountCode"),
      dataIndex: "receiving_account_code",
      key: "receiving_account_code",
    },
    {
      title: t("table.state"),
      dataIndex: "state",
      key: "state",
      filters: stateFilters,
      filterMultiple: false,
      filtered: filter && filter.state ? true : false,
      filteredValue: filter && filter.state ? [filter.state] : [],
      //render: (_, row) => <AdjustmentStateCell adjustment={row} t={t} />,
    },
    {
      title: "",
      dataIndex: "details",
      width: 75,
      align: "center",
      // sorter: sortUser("state"),
      render: (_, row) => {
        return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => goToAdjustmentDetails(row.id)} />;
      },
    },
  ];

  const extraHeaderContent = (
    <Space>
      <Button icon={<ReloadOutlined />} >
        {t("table.reload")}
      </Button>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        + {t("table.newAdjustment")}
      </Button>
    </Space>
  );

  return (
    <>
      <Card
        className="setter-page-header"
        title={translate("setter.layouts.operations.nav.adjustments")}
        ghost={false}
        extra={extraHeaderContent}
      >
        <Table
          bordered
          
          dataSource={data}
          rowKey="id"
          columns={columns}
          pagination={{
            position: ["bottomLeft"],
            total:  undefined,
            current: filter ? filter.page : undefined,
            pageSize: filter ? filter.limit : undefined,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
        />
      </Card>
      <Modal
        title={t("form.title")}
        visible={isModalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose={true}
      >
       <AdjustmentForm />
      </Modal>
    </>
  );
}

const AdjustmentStateCell = ({
  adjustment,
  t,
}) => {
  const [adjustmentState, setAdjustmentState] = useState(adjustment.state);

  const onCompleted = (data) => setAdjustmentState((data?.actionAdjustment?.state) || adjustmentState);

  

  useEffect(() => {
    setAdjustmentState(adjustment.state);
  }, [adjustment.state]);

  return adjustmentState === AdjustmentState.Pending ? (
    <Select
      
      onClick={(e) => e.stopPropagation()}
      value={t(`state.${adjustmentState}`)}
     
    >
      {Object.values(AdjustmentAction).map((action) => (
        <Select.Option key={action} value={action}>
          {t(`state.${action}`)}
        </Select.Option>
      ))}
    </Select>
  ) : (
    <Tag color={adjustmentStateColors[adjustmentState]}>{t(`state.${adjustmentState}`)}</Tag>
  );
};
