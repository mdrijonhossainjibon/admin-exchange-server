import { useState } from "react";
import { EllipsisOutlined, ReloadOutlined } from "@ant-design/icons";
import { Table, Switch, Button, Modal, Card, Space } from "antd";
import { useTranslation } from "react-i18next";
import{ MarketsForm }from "./form";
import { useNavigate } from "react-router-dom";
import { APIREQ, API_CALL_ENDPOINT } from '../../../../api'

import { useDate } from "../../../../utils/hooks";


export const Markets =() => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { formatDate } = useDate();
  const [tableData,settableData] = useState([]);
  const { t: translate } = useTranslation();
  const history = useNavigate()



  const goToMarketDetails = (id) => {
    //history.push(Routes.withParams.MarketsDetails({ id }));
    history('details/'+id)
  };

  const t = (id) => translate(`setter.layouts.configurations.markets.${id}`);
  
  APIREQ({ url : `${API_CALL_ENDPOINT.base_api_verson}/market`}).then((resp)=>{
    settableData(resp.data.result.data)
  })

   
 
  const columns = [
    {
      title: t("table.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("table.baseCurrency"),
      dataIndex: ["base_unit"],
      key: "base_unit",
    },
    {
      title: t("table.quoteCurrency"),
      dataIndex: ["quote_unit"],
      key: "quote_unit",
    },
    {
      title: t("table.created"),
      dataIndex: "created_at",
      key: "created_at",
      render: (dateString) => formatDate(dateString),
    },
    {
      title: t("table.updated"),
      dataIndex: "updated_at",
      key: "updated_at",
      render: (dateString) => formatDate(dateString),
    },
    {
      title: t("table.maxPrice"),
      dataIndex: "max_price",
      key: "max_price",
    },
    {
      title: t("table.minPrice"),
      dataIndex: "min_price",
      key: "min_price",
    },
    {
      title: t("table.minAmount"),
      dataIndex: "min_amount",
      key: "min_amount",
    },
    {
      title: t("table.status.title"),
      dataIndex: "enabled",
      key: "enabled",
      render: (value, record) => (
        <Switch
          size="small"
          onClick={(_, e) => e.stopPropagation()}
          defaultChecked={value}
          onChange={(val) => {
            console.log(record);
            
          }}
        />
      ),
    },
    {
      title: "",
      dataIndex: "details",
      width: 75,
      align: "center",
      // sorter: sortUser("state"),
      render: (_, row) => {
        return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => goToMarketDetails(row.id)} />;
      },
    },
  ];

  return (
    <>
      <Card
        ghost={false}
        className="setter-page-header"
        title={translate("setter.layouts.configurations.nav.markets")}
        extra={<Space>
          <Button icon={<ReloadOutlined />} >
            {t("table.reload")}
          </Button>
          <Button type="primary" onClick={() => setModalOpen(true)}>
            + {t("table.new")}
          </Button>
        </Space>}
      >
        <Table
          bordered
          dataSource={ tableData }
          rowKey="id"
          columns={columns}
          loading={false}
          pagination={{
            position: ["bottomLeft"],
            total: tableData.length ,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
         
          // onRow={(market) => ({
          //   tabIndex: 0,
          //   onClick: () => goToMarketDetails(market.id),
          //   onKeyDown: (e) => e.key === "Enter" && goToMarketDetails(market.id),
          // })}
        />
        <Modal
          title={t("modal.create")}
          visible={isModalOpen}
          onCancel={() => setModalOpen(false)}
          footer={null}
          destroyOnClose={true}
        >
        <MarketsForm onCompleted={() =>setModalOpen(false)}/>
        </Modal>
      </Card>
    </>
  );
}
