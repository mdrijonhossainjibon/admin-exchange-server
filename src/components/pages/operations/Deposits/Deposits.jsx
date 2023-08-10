import { useEffect, useState } from "react";

import { ReloadOutlined } from "@ant-design/icons";
import { Button, Modal, Card, Popover, Space } from "antd";
import { useTranslation } from "react-i18next";
import {DepositForm} from "./form";
import { DepositFilterForm }from "./form/DepositFilterForm";
import { DepositTable } from "./DepositTable";

import { useDispatch, useSelector } from "react-redux";
import { Fech_Blockchain ,Currency_Fecth,fetchDeposit,SelectDepositData} from "../../../../modules";

export const Deposits =() =>{
  const { t: translate } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [reload,setreload] = useState(false);

  const t = (id) => translate(`setter.layouts.operations.deposits.${id}`);

  const dispach = useDispatch();

  const DepositData = useSelector(SelectDepositData)

 useEffect(()=>{
  dispach(Fech_Blockchain());
   dispach(Currency_Fecth());
   dispach(fetchDeposit())
 },[dispach])

 
 const HandelReload = ()=>{
  setreload(true);
  dispach(fetchDeposit({setreload}));
 }
 

  return (
    <Card
      ghost={false}
      title={translate("setter.layouts.operations.nav.deposits")}
      extra={<Space>
        <Popover content={<DepositFilterForm/>} open={false}/>
        <Button icon={<ReloadOutlined />} loading={reload} onClick={HandelReload} >
          {t("table.reload")}
        </Button>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          + {t("table.new")}
        </Button>
      </Space>}
    >
      
        <DepositTable deposits={DepositData}/>
     

      <Modal
        title={t("form.title")}
        visible={isModalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose={true}
      >
        < DepositForm  />
      </Modal>
    </Card>
  );
}
