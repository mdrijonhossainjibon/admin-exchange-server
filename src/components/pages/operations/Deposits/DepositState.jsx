import { useState } from "react";
import { CurrencyType } from "../../../../constants/currencies";
import {  DepositState } from "../../../../constants/deposits";

import { useTranslation } from "react-i18next";

import { Select, Tag } from "antd";

const depositStateColors  = {
  [CurrencyType.Fiat]: {
    [DepositState.Submitted]: "processing",
    [DepositState.Processing] : 'processing',
    [DepositState.Accepted]: "success",
    [DepositState.Collected]: "success",
    [DepositState.Rejected]: "error",
  },
  [CurrencyType.Coin]: {
    [DepositState.Submitted]: "processing",
    [DepositState.Processing] : 'processing',
    [DepositState.Collected]: "success",
    [DepositState.Accepted]: "warning",
    [DepositState.Skipped]: "error",
  },
};

export const DepositStateCell = ({ deposit }) => {
  const { t: translate } = useTranslation();
  const t = (id) => translate(`setter.layouts.operations.deposits.${id}`);

  const [depositState, setDepositState] = useState(deposit.Status);
  

 const colorType  =  depositStateColors[deposit.type ][depositState ] || "default";




  return (
    <Tag color={colorType}>{t(`table.state.${depositState}`)}</Tag>
  ) 
};
