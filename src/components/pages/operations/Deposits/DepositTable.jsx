import { useDate } from "../../../../utils/hooks";
import { useTranslation } from "react-i18next";
import { EllipsisOutlined, FilterOutlined, LinkOutlined } from "@ant-design/icons";
import { Button ,Input,Space,Table} from "antd";
import { useNavigate } from "react-router-dom";
import {DepositType} from "./DepositType";
import {DepositStateCell }from "./DepositState";
import { DepositState, DepositTypes } from "../../../../constants/deposits";
import moment from "moment";
import { SelectBlockchaindata ,SelectCurrencisData} from '../../../../modules';
import { useSelector ,useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export const DepositTable = ({ deposits }) =>{
  const { formatDate } = useDate();
  const { t: translate } = useTranslation();
  const history = useNavigate();
  const Blockchaindata = useSelector(SelectBlockchaindata);
  const dispach = useDispatch()

  

  const t = (id) => translate(`setter.layouts.operations.deposits.${id}`);


  const stateFilters = Object.values(DepositState).map((el) => {
    return { text: String(el), value: String(el) };
  });

  const typeFilters = Object.values(DepositTypes).map((el) => {
    return { text: String(el), value: String(el) };
  });


  const currency =  useSelector(SelectCurrencisData)

  const currency_codeFilters = currency.map((el)=>{
    return { text: String(el.code), value: String(el.code) };
  })




  const openDepositDetails = (tid) => {
    
    history('/operations/deposits/details/'+tid)
  };
  


 

  const columns = [
    {
      title: t("table.id"),
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => `${index}`, // Add index to ensure unique keys
    },
    {
      title: t("table.uid"),
      dataIndex: "uid",
      key: "uid",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        const handleSearch = () => {
          confirm();
        };
  
        const handleReset = () => {
          setSelectedKeys([]);
          clearFilters();
          confirm();
        };
  
        return (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Enter full UID"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={handleSearch}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button size="small" icon={<FilterOutlined />} onClick={handleSearch} style={{ width: 90 }}>
                Search
              </Button>
              <Button size="small" onClick={handleReset} style={{ width: 90 }}>
                Reset
              </Button>
            </Space>
          </div>
        );
      },
      onFilter: (value, record) => record.uid.includes(value),
    },
    {
      title: t("table.txid"),
      dataIndex: "txid",
      key: "txid",
      // width: 350,
      render: (txid, row) => {
        const url = Blockchaindata && Blockchaindata.find((item)=> item.key.includes(row.key))
        const href = url?.explorer_address?.replace('#{tx}',txid) //url?.explorer_address ;
        function truncate(input) {
          const l = 26;
          if (input.length > l) {
            return input.substring(0, l - 8) + "...";
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
      title: t("table.type"),
      dataIndex: "type",
      align: "center",
      key: "type",
      filters: typeFilters,
      filterMultiple: false,
      onFilter : (value,record) => record.type.includes(value),
      render: (type) => {
        return <DepositType type={type} />;
      },
    },
    {
      title: t("table.created_at"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (dateString) => formatDate(dateString),
    },
    {
      title: t("table.amount"),
      dataIndex: "amount",
      align: "right",
      sorter: (a, b) => a.amount - b.amount,
      key: "amount",
    },
    {
      title: t("table.currency_code"),
      dataIndex: "currency_code",
      key: "currency",
      filters: currency_codeFilters,
      filterMultiple: false,
      onFilter : (value,record) => record.currency_code.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
      render: (code) => code?.toUpperCase(),
    },
    {
      title: t("table.confirmations"),
      dataIndex: "confirmations",
      align: "center",
      key: "confirmations",
    },
    {
      title: t("table.state.title"),
      dataIndex: "Status",
      align: "center",
      key: "Status",
      filters: stateFilters,
      filterMultiple: false,
      onFilter : (value,record) => record.Status.includes(value),
      render: (_, row) => <DepositStateCell deposit={row} />,
    },
    {
      title: "",
      dataIndex: "details",
      width: 75,
      align: "center",
      // sorter: sortUser("state"),
      render: (_, row) => {
        return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => openDepositDetails(row.txid)} />;
      },
    },
  ];

  return (
    <Table
      bordered
      loading={deposits.length > 0 ? false : true}
      dataSource={deposits}
      rowKey="tid"
      columns={columns}
      
      pagination={{
        position: ["bottomLeft"],
        current:  undefined,
        pageSize:  undefined,
        showQuickJumper: true,
        showSizeChanger: true,
      }}
    />
  );
}
