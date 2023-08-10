import { Table,Typography } from "antd"
import { OrderSide, OrderSideColors } from "../../../../constants/orders";
import { useDate } from "../../../../utils/hooks";
import { useTranslation } from "react-i18next";
 
export const TradeTable = ({trades, loading, filter, total, userId, changeFilter})=>{
    const { formatDate } = useDate();
    const { t: translate } = useTranslation();
    const t = (id) => translate(`setter.layouts.operations.trades.${id}`);
    const marketData = [// An array of objects representing the table data
    // Each object should have properties corresponding to the column keys
    // Example data:
    { id: 1, maker: { email: 'maker1@example.com', uid: 'maker1-uid' }, taker: { email: 'taker1@example.com', uid: 'taker1-uid' }, market: { name: 'BTC-USDT' }, price: 10, amount: 5, total: 50, taker_type: 'buy', created_at: new Date() },
    { id: 2, maker: { email: 'maker2@example.com', uid: 'maker2-uid' }, taker: { email: 'taker2@example.com', uid: 'taker2-uid' }, market: { name: 'LTC-USDT' }, price: 20, amount: 3, total: 60, taker_type: 'sell', created_at: new Date() },
    ];
    const marketFilters = marketData.map((el) => {
        return { text: `${String(el.name)}`, value: String(el.id) };
      });

    const columns  = [
        {
          title: t("table.id"),
          dataIndex: "id",
          key: "id",
          width: 100,
        },
        {
          title: t("table.maker"),
          dataIndex: ["maker", "email"],
          key: "makerEmail",
          render: (_, row) => (
            <>
              {row.maker.email} ({row.maker.uid})
            </>
          ),
        },
        {
          title: t("table.taker"),
          dataIndex: ["taker", "email"],
          key: "takerEmail",
          render: (_, row) => (
            <>
              {row.taker.email} ({row.taker.uid})
            </>
          ),
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
          render: (name) => name.toUpperCase(),
        },
        {
          title: t("table.price"),
          dataIndex: "price",
          key: "price",
          sorter: (a, b) => a.price - b.price,
          width: 75,
        },
        {
          title: t("table.amount"),
          dataIndex: "amount",
          key: "amount",
          sorter: (a, b) => a.amount - b.amount,
          width: 75,
        },
        {
          title: t("table.total"),
          dataIndex: "total",
          key: "total",
          sorter: (a, b) => a.total - b.total,
          width: 75,
        },
        {
          title: t("table.side"),
          dataIndex: "taker_type",
          key: "taker_type",
          width: 75,
          render: (value, row) => {
            if (userId && row.taker.uid === userId) {
              return (<Typography.Text type={OrderSideColors[value]}>{t(`side.${value}`)}</Typography.Text>);
            } else {
              return (<Typography.Text type={OrderSideColors[value]}>{t(`side.${value === "sell" ? "buy" : "sell"}`)}</Typography.Text>);
            }
          },
        },
        {
          title: t("table.time"),
          dataIndex: "created_at",
          key: "created_at",
          render: (value) => formatDate(value),
        },
      ];
    
    return(
        <>
        <Table columns={columns} dataSource={marketData}/>
        </>
    )
}