import { CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Table, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { OrderSide, OrderSideColors, OrderState } from "../../../../../../constants/orders";
import { useDate } from "../../../../../../utils/hooks";


import OrderStatus from "../../../../operations/orders/OrdersStatus";




export const UserOrderTable = ({ orders, loading, filter, total, changeFilter })=> {
  const { formatDate } = useDate();
  const { t: translate } = useTranslation();

  const t = (id) => translate(`setter.layouts.operations.orders.${id}`);

  const sideFilter = Object.values(OrderSide).map((el) => {
    return { text: String(el), value: String(el) };
  });
  
  const marketData = []
  const marketFilters = marketData.data?.adminMarkets?.map((el) => {
    return { text: `${String(el.name)}`, value: String(el.id) };
  });

  const handleCancel = (id) => {
    Modal.confirm({
      maskClosable: true,
      title: t("delete.title"),
      icon: <ExclamationCircleOutlined />,
      okText: t("delete.ok"),
      cancelText: t("delete.cancel"),
      okButtonProps: {
        loading,
      },
      onOk: () => {
        
      },
    });
  };

  const columns = [
    {
      title: t("table.id"),
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: t("table.market"),
      dataIndex: ["market", "name"],
      key: "market",
      width: 100,
      filters: marketFilters,
      filterMultiple: false,
      filtered: filter && filter.market ? true : false,
      filteredValue: filter && filter.market ? [filter.market] : [],
      render: (name) => name,
    },
    {
      title: t("table.amount"),
      dataIndex: "origin_volume",
      key: "origin_volume",
      sorter: (a, b) => a.origin_volume - b.origin_volume,
      width: 75,
    },
    {
      title: t("table.executed"),
      dataIndex: "executed_volume",
      key: "executed_volume",
      sorter: (a, b) => a.executed_volume - b.executed_volume,
      width: 100,
    },
    {
      title: t("table.price"),
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      width: 75,
    },
    {
      title: t("table.side"),
      dataIndex: "side",
      key: "type",
      width: 75,
      filters: sideFilter,
      filterMultiple: false,
      filtered: filter && filter.type ? true : false,
      filteredValue: filter && filter.type ? [filter.type] : [],
      render: (value) => (
        <Typography.Text type={OrderSideColors[value]}>{t(`side.${value}`)}</Typography.Text>
      ),
    },
    {
      title: t("table.created"),
      dataIndex: "created_at",
      key: "created_at",
      render: (value) => formatDate(value),
    },
    {
      title: t("table.updated"),
      dataIndex: "updated_at",
      key: "updated_at",
      render: (value) => formatDate(value),
    },
    {
      title: "State",
      dataIndex: "state",
      align: "center",
      key: "state",
      render: (_, row) => <OrderStatus state={row.state} />,
    },
    {
      title: "",
      dataIndex: "delete",
      key: "delete",
      align: "center",
      width: 75,
      render: (_, row) =>
           (
          <Button
            
            shape="circle"
            onClick={() => handleCancel(row.id)}
            icon={<CloseOutlined />}
            // type="ghost"
            danger={true}
          />
        ),
    },
  ];

  return (
    <Table
      bordered
      
      dataSource={orders}
      rowKey="id"
      columns={columns}
      
    />
  );
}
