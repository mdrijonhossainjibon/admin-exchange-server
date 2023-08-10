import { useState } from "react";
import { CurrencyType } from "../../../../constants/currencies";
import { useTranslation } from "react-i18next";
import { Space, Tabs, Table, PageHeader, Button, Card } from "antd";
import { EllipsisOutlined, ReloadOutlined, LinkOutlined } from "@ant-design/icons";
import { useDate } from "../../../../utils/hooks";
import { WithdrawState } from "../../../../constants/withdraws";
import { WithdrawalStatus } from "../withdrawals/WithdrawalStatus";

const currencyData = {
  data: {
    adminCurrencies: [
      {
        type: CurrencyType.Coin,
        code: "btc",
      },
      {
        type: CurrencyType.Coin,
        code: "eth",
      },
      {
        type: CurrencyType.Fiat,
        code: "usd",
      },
    ],
  },
};

const data = {
  adminWithdraws: {
    result: [
      {
        id: 0,
        blockchain_txid: "abc123",
        created_at: "2023-06-29T10:30:00Z",
        currency: {
          code: "btc",
          type : 'fiat'
        },
        amount: 0.5,
        rid: "xyz456",
        state: WithdrawState.Succeed,
        member: {
          user: {
            email: "user@example.com",
          },
        },
      },
      {
        id: 0,
        blockchain_txid: "def789",
        created_at: "2023-06-28T15:45:00Z",
        currency: {
          code: "eth",
          type : 'coin'
        },
        amount: 1.25,
        rid: "uvw789",
        state: WithdrawState.Succeed,
        member: {
          user: {
            email: "anotheruser@example.com",
          },
        },
      },
    ],
    total: 2,
  },
};

export const PendingWithdrawals = () => {
  const [filter, setFilter] = useState();

  const currency_codeFilters = (filter && filter.type)
    ? currencyData.data?.adminCurrencies
      ?.filter((el) => el.type === filter.type)
      .map((el) => {
        return { text: `${String(el.code.toUpperCase())}`, value: String(el.code) };
      })
    : currencyData.data?.adminCurrencies?.map((el) => {
      return { text: `${String(el.code.toUpperCase())}`, value: String(el.code) };
    });

  const { t: translate } = useTranslation();

  const t = (id) => translate(`setter.layouts.operations.withdrawals.table.${id}`);

  const { formatDate } = useDate();

  const panes = [
    { tab: t("panes.coin"), key: CurrencyType.Coin },
    { tab: t("panes.fiat"), key: CurrencyType.Fiat },
  ];

  const openWithdrawalDetails = (id) => {
    ///history.push(Routes.withParams.WithdrawalDetails({ id }));
  };

  const columns = [
    {
      title: t("id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("email"),
      dataIndex: ["member", "user", "email"],
      key: "email",
    },
    {
      title: t("txid.title"),
      dataIndex: "blockchain_txid",
      key: "txid",
      render: (txid, row) => {
        const href = row.currency?.explorer_transaction?.replace("#{txid}", txid);

        function truncate(input) {
          const l = 26;
          if (input.length > l) {
            return input.substring(0, l - 2) + "...";
          }
          return input;
        }
        return txid ? (
          <>
            <Button icon={<LinkOutlined />} type="link" target="_blank" href={href}>
              {truncate(txid)}
            </Button>
          </>
        ) : null;
      },
    },
    {
      title: t("created_at"),
      dataIndex: "created_at",
      key: "created_at",
      render: (dateString) => formatDate(dateString),
    },
    {
      title: t("currency"),
      dataIndex: ["currency", "code"],
      key: "currency",
      filters: currency_codeFilters,
      filterMultiple: false,
      filtered: filter && filter.currency ? true : false,
      filteredValue: filter && filter.currency ? [filter.currency] : [],
      render: (code) => code.toUpperCase(),
    },
    {
      title: t("amount"),
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
      key: "amount",
    },
    {
      title: t("rid"),
      dataIndex: "rid",
      key: "rid",
      align: "center",
      render: (rid, row) => {
        const href = row.currency?.explorer_address?.replace("#{address}", rid);

        function truncate(input) {
          const l = 26;
          if (input.length > l) {
            return input.substring(0, l - 2) + "...";
          }
          return input;
        }
        return rid ? (
          <>
            <Button icon={<LinkOutlined />} type="link" target="_blank" href={href}>
              {truncate(rid)}
            </Button>
          </>
        ) : null;
      },
    },
    {
      title: t("state.title"),
      dataIndex: "state",
      key: "state",
      align: "center",
      render: (_, row) => <WithdrawalStatus withdrawal={row} />,
    },
    {
      title: "",
      dataIndex: "details",
      align: "center",
      render: (_, row) => {
        return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => openWithdrawalDetails(row.id)} />;
      },
    },
  ];

  const changeFilter = (filter) => {
    const params = { ...filter };
    setFilter(filter);
  };

  const changeCurrencyType = (type) => {
    const params = { ...filter, type };
    setFilter(params);
  };

  const filteredData = panes.find((pane) => pane.key === filter?.type)
    ? data.adminWithdraws.result.filter((withdrawal) => withdrawal.currency.type === filter.type)
    : data.adminWithdraws.result;

  return (
    <>
      <Card
        className="setter-page-header"
        ghost={false}
        title={translate("setter.layouts.operations.nav.pendingWithdrawals")}
        extra={[
          <Space>
            <Button icon={<ReloadOutlined />} >
              {t("reload")}
            </Button>
          </Space>,
        ]}
      >
        <Tabs defaultActiveKey={filter?.type} onChange={changeCurrencyType}>
          {panes.map((pane) => (
            <Tabs.TabPane {...pane}>
              <Table
                tableLayout="auto"
                bordered
                dataSource={filteredData}
                rowKey="id"
                columns={columns}
                pagination={{
                  position: ["bottomLeft"],
                  total: filteredData.length,
                  current: filter ? filter.page : undefined,
                  pageSize: filter ? filter.limit : undefined,
                  showQuickJumper: true,
                  showSizeChanger: true,
                }}
                onChange={(p, f) => {
                  const params = {
                    ...filter,
                    page: p.current,
                    limit: p.pageSize,
                  };
                  if (f.currency && f.currency.length !== 0) {
                    params.currency = f.currency[0];
                  } else {
                    if (params.currency) {
                      delete params.currency;
                    }
                  }
                  if (changeFilter) {
                    changeFilter(params);
                  }
                }}
              />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Card>
    </>
  );
};
