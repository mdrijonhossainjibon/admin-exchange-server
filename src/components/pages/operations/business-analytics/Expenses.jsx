import React, { useState } from "react";

import { Table } from "antd";
import { useDate } from "../../../../utils/hooks";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


export const Expenses =() =>{
  const { formatDate } = useDate();
  const { t: translate } = useTranslation();

  const t = (id) => translate(`setter.layouts.operations.businessAnalytics.expenses.${id}`);

  const history =  useNavigate ();
  
  const [filter, setFilter] = useState();



  const changeFilter = (filter) => {
    setFilter(filter);
  };

  const data = [
    { id: 1, code: 'ABC123', currency: { code: 'USD' }, rid: 'ref-1', reference_type: 'Type A', credit: 100, debit: 0, created_at: new Date() },
  { id: 2, code: 'DEF456', currency: { code: 'EUR' }, rid: 'ref-2', reference_type: 'Type B', credit: 0, debit: 50, created_at: new Date() },
  ]
  const columns = [
    {
      title: t("id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("code"),
      dataIndex: "code",
      key: "code",
    },
    {
      title: t("currency"),
      dataIndex: ["currency", "code"],
      key: "currencyCode",
      render: (value) => value.toUpperCase(),
    },
    {
      title: t("refId"),
      key: "rid",
      dataIndex: "rid",
    },
    {
      title: t("refType"),
      key: "reference_type",
      dataIndex: "reference_type",
    },
    {
      title: t("credit"),
      key: "credit",
      dataIndex: "credit",
    },
    {
      title: t("debit"),
      key: "debit",
      dataIndex: "debit",
    },
    {
      title: t("date"),
      key: "created_at",
      dataIndex: "created_at",
      render: (value) => formatDate(value),
    },
  ];

  

  return (
    <React.Fragment>
      <Table
        bordered
        dataSource={data}
        rowKey="id"
        columns={columns}
       
        pagination={{
          position: ["bottomLeft"],
          total : 1,
          current: filter ? filter.page : undefined,
          pageSize: filter ? filter.limit : undefined,
          showQuickJumper: true,
          showSizeChanger: true,
        }}
      />
      {/* <PaginationComponent /> */}
    </React.Fragment>
  );
}
