import React, { useState } from "react";
import { Button, PageHeader, Space, Table, DatePicker,Input } from "antd";
import { FolderOpenOutlined, EllipsisOutlined, ReloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import countryISO from "i18n-iso-countries";
import { useDate } from "../../../../utils/hooks";
import KYCDetails from "./KYCDetails";

export const Application = () => {
  const { formatDate } = useDate();
  const { i18n, t } = useTranslation();

  const lang = i18n.language.split("-")[0];

  const [data, setData] = useState([
    {
      uid: 1,
      email: "example1@example.com",
      name: "John Doe",
      country: "USA",
      created_at: "2023-06-29",
      numDocs: 3,
      details: "Some details 1",
      documents: [{
        doc_type: "Passport",
      doc_number: "AB123456",
      doc_expire: "2025-01-01",
        upload: {
          url: "https://example.com/passport.jpg"
        }
      }],
      profile : {
        address : 'usd',
        city : 'rangpur',
        postcode : '20900',
        country : 'USA'
      }
    }
    // Add more data objects as needed
  ]);
  

  const handleReject = (row) => {};

  const handleVerify = (row) => {};

  const openUserDetails = (uid) => {};





  const columns = [
    {
      title: t("setter.layouts.users.table.userId"),
      dataIndex: "uid",
      key: "uid",
      width: 80,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={t("setter.layouts.users.table.userId")}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button type="primary" onClick={confirm} size="small" style={{ width: 90 }}>
              {t("setter.layouts.users.table.filter")}
            </Button>
            <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
              {t("setter.layouts.users.table.reset")}
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => record.uid.toString().includes(value),
    },
    {
      title: t("setter.layouts.users.table.email"),
      dataIndex: "email",
      key: "email",
      width: 200,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={t("setter.layouts.users.table.email")}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button type="primary" onClick={confirm} size="small" style={{ width: 90 }}>
              {t("setter.layouts.users.table.filter")}
            </Button>
            <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
              {t("setter.layouts.users.table.reset")}
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => record.email.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: t("setter.layouts.users.table.name"),
      dataIndex: "name",
      key: "name",
      width: 100,
      render: (_, row) => ["name"].join(" "),
    },
    {
      title: t("setter.layouts.users.table.country"),
      dataIndex: "country",
      key: "country",
      width: 100,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={t("setter.layouts.users.table.country")}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button type="primary" onClick={confirm} size="small" style={{ width: 90 }}>
              {t("setter.layouts.users.table.filter")}
            </Button>
            <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
              {t("setter.layouts.users.table.reset")}
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => record.country.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: t("setter.layouts.users.table.created"),
      dataIndex: "created_at",
      key: "created_at",
      width: 175,
      render: (value) => formatDate(value),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <DatePicker
            placeholder={t("setter.layouts.users.table.created")}
            value={selectedKeys[0]}
            onChange={(date) => setSelectedKeys(date ? [date] : [])}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button type="primary" onClick={confirm} size="small" style={{ width: 90 }}>
              {t("setter.layouts.users.table.filter")}
            </Button>
            <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
              {t("setter.layouts.users.table.reset")}
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => {
        const createdDate = new Date(record.created_at);
        const filterDate = new Date(value);
        return (
          createdDate.getFullYear() === filterDate.getFullYear() &&
          createdDate.getMonth() === filterDate.getMonth() &&
          createdDate.getDate() === filterDate.getDate()
        );
      },
    },
    {
      title: t("setter.layouts.users.table.attachments"),
      dataIndex: "numDocs",
      key: "numDocs",
      width: 120,
      render: (value) => (
        <>
          {value} <FolderOpenOutlined />
        </>
      ),
    },
    {
      title: "",
      dataIndex: "details",
      key: "x",
      align: "center",
      width: 250,
      render: (_, row) => {
        return (
          <>
           <Space>
           <Button type="primary" danger onClick={() => handleReject(row)}>
              {t("setter.layouts.users.table.reject")}
            </Button>
            &nbsp;
            <Button type="primary" onClick={() => handleVerify(row)}>
              {t("setter.layouts.users.table.verify")}
            </Button>
           </Space>
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "details",
      width: 75,
      align: "center",
      render: (_, row) => {
        return (
          <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => openUserDetails(row.uid)} />
        );
      },
    },
  ];

  return (
    <>

      <Table
        dataSource={data}
        columns={columns}
        tableLayout="fixed"
        pagination={{
          position: ["bottomLeft"],
          total: 1,
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
        }}
        expandable={{
          expandedRowRender: (record) => {
            return record && record.documents ? <KYCDetails record={record} /> : <p />;
          },
        }}
      />
    </>
  );
};
