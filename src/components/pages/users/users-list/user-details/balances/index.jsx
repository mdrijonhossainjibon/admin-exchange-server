import { Table } from "antd";


import { useTranslation } from "react-i18next";
import { SelectCurrencisData,Currency_Fecth } from '../../../../../../modules'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
export const UserDetailsBalances =({ user }) => {
  const { t: translate } = useTranslation();

  const t = (id) => translate(`setter.layouts.users.details.balances.${id}`);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(Currency_Fecth())
  },[dispatch])
 
  
const users = [];

const Currencis = useSelector(SelectCurrencisData)
const currency_codeFilters = Currencis.map((el)=>{
  return { text: String(el.code), value: String(el.code) };
})
const data = [];


Currencis.map((item)=>{
 const result = users.find((code)=> code.symbol.toLocaleLowerCase().includes(item.code.toLocaleLowerCase()));
 if(result){
  data.push({
    symbol : item.symbol,
    locked : result.locked,
    balance : result.balance,
    precision : item.precision
  })
 }else{
  data.push({
    symbol : item.symbol,
    locked : 	0,
    balance : 0,
    precision : 6
  })
 }
})


  const columns = [
    {
      title: 'id',
      render : (_,__,id) => id
    },
    {
      title: t("currency"),
      dataIndex: 'symbol',
      key: "currencyCode",
      render: (value) => value,
      filters : currency_codeFilters,
      filterMultiple: false,
      onFilter : (value,record) => record?.symbol?.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
      render: (code) => code?.toUpperCase()
    },
    {
      title: t("available"),
      dataIndex: "balance",
      key: "balance",
      render: (value, row) => {
        return Number(value).toPrecision(row?.precision)
      }
    },
    {
      title: t("locked"),
      dataIndex: "locked",
      key: "locked",
      render: (value, row) => {
        return Number(value).toPrecision(row?.precision)
      }
    },
    {
      title: t("total"),
      dataIndex: "total",
      key: "total",
      render: (_, row) => {
        return Number(row.balance + row.locked).toPrecision(row?.precision)
      },
    },
    {
      title : 'Timestamp',
      render : ()=>{
        return new Date().toLocaleDateString()
      }
    }
  ];

  return (
    <Table
      
      dataSource={data}
      columns={columns}
      rowKey="currencyCode"
      pagination={{ position: ["bottomLeft"] }}
    />
  );
}
