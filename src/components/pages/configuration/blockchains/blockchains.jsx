import { useEffect, useState } from "react";
import { Button, Table, Card, Space } from "antd";
import './style.css';
import { useTranslation } from "react-i18next";
import { EllipsisOutlined, ReloadOutlined } from "@ant-design/icons";
//import { BlockchainsData } from "./BlockchainsBridge";
import { BlockchainFormModal } from "./modal/";

import { useDate } from "../../../../utils/hooks";
import { ToggleSwitch } from "../ToggleSwitch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Fech_Blockchain, Fech_Blockchain_Number, SelectBlockchaindata, Set_Blockchain, Create_Blockchain, Update_Blochain_Find, Update_Blochain_data, GetUpdated } from "../../../../modules/";
import axios from "axios";
import { API_CALL_ENDPOINT, WSS_CALL_ENDPOINT, WebSocketProvider } from "../../../../api";

export const Blockchains = () => {
  const { t } = useTranslation();
  const [isCreateModalVisible, setCreateModalState] = useState(false);
  const Navigate = useNavigate()
  const { formatDate } = useDate();
  const dispach = useDispatch();
  const BlockchainData = useSelector(SelectBlockchaindata);
  const [reload, setreload] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {



    setTimeout(() => {
      dispach(Fech_Blockchain({ t }))
    }, 1000);



    if (BlockchainData) {
      WebSocketProvider({ url: WSS_CALL_ENDPOINT.UserWallet }, (data) => {

        if (data.data.length > 0) {
          data.data.map((item) => {
            dispach(Update_Blochain_Find({ key: item.key, height: item.BlockNumber }))
          })
        }

      })
    }

  }, [dispach])




  const handleToggle = (variables) => {

    dispach(GetUpdated({ body: { key: variables.key, enabled: variables.enabled,updated : 'reload' }, t }))

  };
  const openBlockchainDetails = (id) => {
    Navigate('/configuration/blockchains/info/' + id)
  };

  const onClickAddNewBlockchain = () => {
    setCreateModalState(true);
  };
  const handleCreateCancel = () => {
    setCreateModalState(false);
  };

  const submitCreateForm = async (formModel) => {
    const Cretedata = {

      key: formModel.key,
      name: formModel.name,
      client: formModel.client,
      height: formModel.height,
      explorer_address: formModel.explorer_address,
      explorer_transaction: formModel.explorer_transaction,
      min_confirmations: formModel.min_confirmations,
      server: formModel.server,
      Websoket : formModel.Websoket,
      chainid : Number(formModel.chainid),
      created_at: new Date(),
      enabled: formModel.enabled,
    }

    setCreateModalState(false);
    setloading(true)
    dispach(Update_Blochain_data(Cretedata));
    dispach(Create_Blockchain({ t, setloading, data: Cretedata }));
    console.log(formModel)
  }



  const columns = [
    {
      title: t("setter.layouts.configurations.blockchains.table.id"),
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => `${index}`, // Add index to ensure unique keys
    },
    {
      title: t("setter.layouts.configurations.blockchains.table.key"),
      dataIndex: "key",
      key: "key",
    },
    {
      title: t("setter.layouts.configurations.blockchains.table.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("setter.layouts.configurations.blockchains.table.client"),
      dataIndex: "client",
      key: "client",
    },
    {
      title: t("setter.layouts.configurations.blockchains.table.height"),
      dataIndex: "height",
      key: "height",
    },
    {
      title: t("setter.layouts.configurations.blockchains.table.createdAt"),
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => formatDate(date),
    },
    {
      title: t("setter.layouts.configurations.blockchains.table.status.title"),
      dataIndex: "enabled",
      key: "enabled",
      align: "center",
      render: (_, record) => (
        <ToggleSwitch value={record} name="enabled" onChange={handleToggle} />
      ),
    },
    {
      title: "",
      dataIndex: "details",
      width: 75,
      align: "center",
      // sorter: sortUser("state"),
      render: (_, row) => {
        return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => openBlockchainDetails(row.key)} />;
      },
    },
  ];

  return (
    <>
      <Card title={t("setter.layouts.configurations.nav.blockchains")} extra={(
        <Space>
          <Button icon={<ReloadOutlined />} loading={reload} disabled={reload} onClick={() => { dispach(Fech_Blockchain({ t, setreload })); setreload(true) }}>
            {t("setter.layouts.configurations.blockchains.table.reload")}
          </Button>
          <Button type="primary" loading={loading} disabled={loading} onClick={onClickAddNewBlockchain}>
            + {t("setter.layouts.configurations.blockchains.table.new")}
          </Button>
        </Space>
      )}>
        <Table
          loading={BlockchainData ? false : true}
          bordered
          columns={columns}
          dataSource={BlockchainData ? BlockchainData : []}
          pagination
          rowKey="id"
        />
        <BlockchainFormModal
          isModalVisible={isCreateModalVisible}
          onCancel={handleCreateCancel}
          onSubmit={submitCreateForm}
          titleKey="setter.layouts.configurations.blockchains.modal.title.create"
        />
      </Card>

    </>
  );
}
