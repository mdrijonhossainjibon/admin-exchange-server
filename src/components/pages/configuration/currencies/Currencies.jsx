import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReloadOutlined, EllipsisOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Table, Card, Modal, Space, Switch, Input } from "antd";
import { useNavigate} from "react-router-dom";
import { CurrencyType, CurrencyVisible } from "../../../../constants/currencies";
import { useDate } from "../../../../utils/hooks";
import{ CurrenciesForm } from "./form/";
import { DepositType } from "../../operations/Deposits/DepositType";
import { useDispatch, useSelector } from "react-redux";
import { SelectCurrencisData,Update_Currency_Fecth ,Currency_Fecth,Create_Currency} from "../../../../modules";
import { newInitialData } from "../../../../constants/deposits";





export const Currencies = () =>{
  const [isModalOpen, setModalOpen] = useState(false);
  const [optionFields, setOptionFields] = useState(newInitialData.options ||[])
  const { t } = useTranslation();
  const history = useNavigate();
  const { formatDate } = useDate();
  const [loading,setloading] = useState(false)

  const [createloading,setcreateloading] = useState(false);
  const CurrencisData = useSelector(SelectCurrencisData);
  const dispach = useDispatch()
  
const onCompleted = (value)=>{
  //console.log({value ,options : optionFields,t,})
setcreateloading(true)
  dispach(Create_Currency({value ,options : optionFields,t,}))
  setModalOpen(false)
}





  const typeFilters = Object.values(CurrencyType).map((el) => {
    return { text: String(el), value: String(el) };
  });

  const visibleFilters = Object.values(CurrencyVisible).map((el) => {
    return { text: String(el), value: el };
  });



  const openCurrencyDetails = (code) => {
    history('details/'+code)
  };


  const columns = [
    { 
      title: t("setter.layouts.configurations.blockchains.table.id"),
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => `${index}`, 
     },
    {
      title: t("setter.layouts.configurations.currencies.table.code"),
      dataIndex: "code",
      key: "code",
      render: (code) => code,
    },
    {
      title: t("setter.layouts.configurations.currencies.table.name"),
      dataIndex: "name",
      key: "name",
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
              placeholder="Enter Currencies Name"
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
      onFilter: (value, record) => record.name.includes(value),
    },
    {
      title: t("setter.layouts.configurations.currencies.table.symbol"),
      dataIndex: "symbol",
      key: "symbol",
      align: "center",
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
              placeholder="Enter Currencies Name"
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
      onFilter: (value, record) => record.symbol.includes(value.toUpperCase()),
    },
    {
      title: t("setter.layouts.configurations.currencies.table.type"),
      dataIndex: "type",
      key: "type",
      filters: typeFilters,
      onFilter : (value,record) => record.type.includes(value),
      render: (type) => {
        return <DepositType type={type} />;
      }
    },
    {
      title: t("setter.layouts.configurations.currencies.table.created"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (dateString => formatDate(dateString)),
    },
    {
      title: t("setter.layouts.configurations.currencies.table.visible"),
      dataIndex: "visible",
      key: "visible",
      align: "center",
      filters : visibleFilters,
      onFilter : (value,record) => record.visible.includes(value) ,
      render: (_, record) => (
        <Switch size='small'checked={record.visible === 'active'}  onChange={()=> dispach(Update_Currency_Fecth({code : record?.code, updated : 'visible'}))} />
      ),
    },
    {
      title: t("setter.layouts.configurations.currencies.table.deposit"),
      dataIndex: "deposit_enabled",
      key: "deposit_enabled",
      align: "center",
      filters : visibleFilters,
      onFilter : (value,record) => record.deposit_enabled.includes(value) ,
      render: (_, record) => (
        <Switch size='small'checked={record.deposit_enabled === 'active'}   
        onChange={()=> dispach(Update_Currency_Fecth({code : record?.code, updated : 'deposit_enabled'}))} />
      ),
    },
    {
      title: t("setter.layouts.configurations.currencies.table.withdrawal"),
      dataIndex: "withdrawal_enabled",
      key: "withdrawal_enabled",
      align: "center",
      filters : visibleFilters,
      onFilter : (value,record) => record?.withdrawal_enabled?.includes(value) ,
      render: (_, record) => (
        <Switch size='small'checked={record?.withdrawal_enabled === 'active'}  
        onChange={()=> dispach(Update_Currency_Fecth({code : record?.code, updated : 'withdrawal_enabled'}))}/>
      ),
    },
    {
      title: "",
      dataIndex: "details",
      width: 75,
      align: "center",
      // sorter: sortUser("state"),
      render: (_, row) => {
        return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => openCurrencyDetails(row.code)} />;
      },
    },
  ];

  

  return (
    <>
      <Card
        ghost={false}
        className="setter-page-header"
        title={t("setter.layouts.configurations.nav.currencies")}
        extra={(
          <Space>
            <Button  icon={<ReloadOutlined />}  loading={loading}
             onClick={()=> {
              dispach(Currency_Fecth(setloading));
              setloading(true)
             }}>
            {t("setter.layouts.configurations.currencies.table.reload")}
            
          </Button>
          <Button type="primary" loading={createloading} onClick={() => {setModalOpen(true) ; }}>
            + {t("setter.layouts.configurations.currencies.table.new")}
          </Button>
          </Space>
        )}
      >
        <Table
          dataSource={CurrencisData}
          bordered
          rowKey="code"
          columns={columns}
          loading={ CurrencisData?.length > 0 ? false : true }
          
         
        />
      </Card>
      <Modal
        title={t("setter.layouts.configurations.currencies.modal.title.create")}
        visible={isModalOpen}
        onCancel={() => setModalOpen(false)}
        width="75%"
        footer={null}
        className="currencies-form-modal"
        destroyOnClose={true}
      >
        <CurrenciesForm  propatisdata={optionFields}  propatis={setOptionFields} onCompleted={onCompleted} />
      </Modal>
    </>
  );
}
