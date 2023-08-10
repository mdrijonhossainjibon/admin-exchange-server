import { useEffect, useState } from "react";
import { Card, Typography } from "antd";

import { useTranslation } from "react-i18next";
import { OrderTable } from "../../../../operations/orders/OrderTable";
import { DepositTable } from "../../../../operations/Deposits/DepositTable";
import { TradeTable } from "../../../../operations/trades/TradeTable";
import { WithdrawalTable } from "../../../../operations/withdrawals/WithdrawalTable";
import { useDispatch, useSelector } from "react-redux";
import { Currency_Fecth, Fech_Blockchain, SelectDepositData, fetchDeposit } from "../../../../../../modules";

export const  UserDetailsHistory = () => {


  const { t: translate } = useTranslation();

  const t = (id) => translate(`setter.layouts.users.details.history.${id}`);

  const dispach = useDispatch();
  const DepositData = useSelector(SelectDepositData)

 
  useEffect(()=>{
    dispach(Fech_Blockchain());
     dispach(Currency_Fecth());
     dispach(fetchDeposit())
   },[dispach])
  



  return (
    <>
      <Card className="setter-details-card">
        <Typography.Title level={4}>{t("trades")}</Typography.Title>
        <TradeTable/>
      </Card>
      <Card className="setter-details-card">
        <Typography.Title level={4}>{t("orders")}</Typography.Title>
        <OrderTable/>
      </Card>
      <Card className="setter-details-card">
        <Typography.Title level={4}>{t("deposits")}</Typography.Title>
         <DepositTable deposits={DepositData}/>
      </Card>
      <Card className="setter-details-card">
        <Typography.Title level={4}>{t("withdrawals")}</Typography.Title>
        <WithdrawalTable loading={false} total={100}/>
      </Card>
    </>
  );
}
