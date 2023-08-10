import { useState } from "react";
import { Button, Modal, Card,Table, Space } from "antd";
import { EllipsisOutlined, LinkOutlined, ReloadOutlined } from "@ant-design/icons";

import { WalletsForm }from "./form";
import { useNavigate } from "react-router-dom";

import { useDate } from "../../../../utils/hooks";
import {ToggleSwitch }from "../ToggleSwitch";
import { WalletKind } from "../../../../constants/wallets";
import { useTranslation } from "react-i18next";

export const Wallets= () =>{
  const [isModalOpen, setModalOpen] = useState(false);
  const { formatDate } = useDate();
  const history = useNavigate()
  const { t: translate } = useTranslation();

  const t = (id) => translate(`setter.layouts.configurations.wallets.${id}`);

 
  const [filter, setFilter] = useState();



  const handleToggle = ({ enabled, id }) => {
    
  };

  const kindFilters = Object.values(WalletKind).map((el) => {
    return { text: String(el), value: String(el) };
  });
   const ab = []
  const currency_codeFilters = ab.map((el) => {
    return { text: `${String(el.code.toUpperCase())}`, value: String(el.code) };
  });

  const goToWalletDetails = (id) => {
    //history.push(Routes.withParams.WalletsDetails({ id }));
    history('details/'+id)
  };

  const tableData = [
    {
      key: 1,
      name: "John Doe",
      address: "123 Main St",
      currency_code: "USD",
      kind: "hot",
      created_at: "2023-06-15",
      max_balance: 1000,
    },
    {
      key: 2,
      name: "Jane Smith",
      address: "456 Elm St",
      currency_code: "EUR",
      kind: "deposit",
      created_at: "2023-06-16",
      max_balance: 2000,
    },
    // Add more objects as needed
  ];
  
 
  
  const columns = [
    {
      title: t("table.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("table.address"),
      dataIndex: "address",
      key: "address",
      render: (addr, row) => {
        const href = row.currency?.explorer_address?.replace("#{address}", addr);
        function truncate(input) {
          const l = 26;
          if (input.length > l) {
            return input.substring(0, l - 2) + "...";
          }
          return input;
        }
        return addr ? (
          <>
            <Button icon={<LinkOutlined />} type="link" target="_blank" href={href}>
              {truncate(addr)}
            </Button>
          </>
        ) : null;
      },
    },
    {
      title: t("table.currency"),
      dataIndex: "currency_code",
      key: "currency",
      filters: currency_codeFilters,
      filterMultiple: false,
      filtered: filter && filter.currency ? true : false,
      filteredValue: filter && filter.currency ? [filter.currency] : [],
      render: (currency) => currency.toUpperCase(),
    },
    {
      title: t("table.kind"),
      dataIndex: "kind",
      key: "kind",
      filters: kindFilters,
      filterMultiple: false,
      filtered: filter && filter.kind ? true : false,
      filteredValue: filter && filter.kind ? [filter.kind] : [],
    },
    {
      title: t("table.created"),
      dataIndex: "created_at",
      key: "created_at",
      render: (dateString) => formatDate(dateString),
    },
    {
      title: t("table.maxBalance"),
      dataIndex: "max_balance",
      key: "max_balance",
    },
    {
      title: t("table.status.title"),
      dataIndex: "enabled",
      key: "enabled",
      render: (_, record) => (
        <ToggleSwitch value={record} onChange={handleToggle} name="enabled"  />
      ),
    },
    {
      title: "",
      dataIndex: "details",
      align: "center",
      // width: 75,
      render: (_, row) => {
        return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => goToWalletDetails(row.id)} />;
      },
    },
  ];

  return (
    <>
      <Card
        ghost={false}
        title={translate("setter.layouts.configurations.nav.wallets")}
        extra={
        <Space>
           <Button icon={<ReloadOutlined />}  >
            {t("table.reload")}
          </Button>
          <Button type="primary" onClick={() => setModalOpen(true)}>
            + {t("table.new")}
          </Button>
        </Space>}
      >
        <Table
          bordered
          dataSource={tableData}
          rowKey="id"
          loading={false}
          columns={columns}
          pagination={{
            position: ["bottomLeft"],
            total: undefined,
            current: filter ? filter.page : undefined,
            pageSize: filter ? filter.limit : undefined,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
          
          // onRow={(wallet) => ({
          //   tabIndex: 0,
          //   onClick: () => goToWalletDetails(wallet.id),
          //   onKeyDown: (e) => e.key === "Enter" && goToWalletDetails(wallet.id),
          // })}
        />
        <Modal
          title={t("modal.create")}
          visible={isModalOpen}
          onCancel={() => setModalOpen(false)}
          footer={null}
          destroyOnClose={true}
        >
         < WalletsForm onCompleted={()=>  setModalOpen(false)}/>
        </Modal>
      </Card>
    </>
  );
}
