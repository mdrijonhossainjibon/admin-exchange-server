import { useEffect, useState } from "react";
import { Button, InputNumber, message, Skeleton, Row, Col, Card, Space } from "antd";
import { BlockchainForm } from "../../form/"

import {  useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { GetUpdated, Update_Blochain_Find } from "../../../../../../modules";
import { useDispatch } from "react-redux";


export const BlockchainDetailsEdit = (props) =>{


  const { t } = useTranslation();
  const [blockchainHeight, setBlockchainHeight] = useState(0);
  const dispach = useDispatch();




  const submitUpdateForm = (formModel) => {
      
      const updated = {
        "name": formModel.name,
        "height": formModel.height,
        "client": formModel.client,
        "min_confirmations": formModel.min_confirmations,
        "key": formModel.key,
        "explorer_address": formModel.explorer_address,
        "server": formModel.server,
        Websoket : formModel.Websoket,
        chainid : formModel.chainid,
        "explorer_transaction": formModel.explorer_transaction,
        "enabled": formModel.enabled
    }
      //dispach(Update_Blochain_Find(updated))
      dispach(GetUpdated({ body: updated, t }))
  };

  const updateBlockchainHeight = () => {
    //dispach(Update_Blochain_Find({key : id,height : blockchainHeight}));
    dispach(GetUpdated({ body: { key: props?.id, height : blockchainHeight,updated : 'height' }, t }))
  };

  const heightInputOnChange = (value) => {
    if (value) {
      setBlockchainHeight(Number(value));
    }
  };

  if (props.loading) return <Skeleton active paragraph={{ rows: 9 }} />;

  return (
    <>
      <Row gutter={[24, 16]}>
        <Col md={24} lg={18}>
          <Card>
            <BlockchainForm onSubmit={submitUpdateForm}  id={props?.id}/>
          </Card>
        </Col>
        <Col md={24} lg={6}>
          <Card>
            <Space direction="vertical">
              <InputNumber
                style={{ width: "100%" }}
                value={blockchainHeight}
                onChange={(value) => heightInputOnChange(value)}
              />

              <Button style={{ width: 100 }} type="primary" onClick={updateBlockchainHeight}>
                {t("setter.layouts.configurations.blockchains.details.edit.reset")}
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  );
}
