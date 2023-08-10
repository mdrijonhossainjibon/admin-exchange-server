import { ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Space, Tabs } from "antd"
import { useTranslation } from "react-i18next";
import { WithdrawalTable } from "./WithdrawalTable";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Fech_Blockchain ,Currency_Fecth,fetchDeposit,SelectDepositData} from "../../../../modules";

export const Withdrawals = ()=>{
  
    const { t: translate } = useTranslation();
    const t = (id) => translate(`setter.layouts.operations.withdrawals.table.${id}`);

    const dispach = useDispatch();

    const Withdrawalsdata = useSelector(SelectDepositData)
  
   useEffect(()=>{
    dispach(Fech_Blockchain());
     dispach(Currency_Fecth());
     dispach(fetchDeposit())
   },[dispach])
  

    const extraTabContent = (
        <Space>
          <Button
            icon={<ReloadOutlined />}
            
            type="default"
           
          >
            {t("reload")}
          </Button>
        </Space>
      );

 

    return(
        <Card 
         title={translate("setter.layouts.operations.nav.withdrawals")}
         extra={extraTabContent}
         >
            <WithdrawalTable data={Withdrawalsdata}/>
        </Card>
    )
}