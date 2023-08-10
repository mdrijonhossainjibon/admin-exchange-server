import { useState } from "react";
import { CurrencyType } from "../../../../constants/currencies";

import { useTranslation } from "react-i18next";
import { Tag } from "antd";

import { WithdrawState } from "../../../../constants/withdraws";

const depositStateColors  = {
  [CurrencyType.Fiat]: {
    [WithdrawState.Prepared]: "processing",
    [WithdrawState.Submitted]: "processing",
    [WithdrawState.Processing]: "processing",
    [WithdrawState.Canceled]: "warning",
    [WithdrawState.Failed]: "warning",
    [WithdrawState.Accepted]: "warning",
    [WithdrawState.Succeed]: "success",
    [WithdrawState.Confirming]: "processing",
    [WithdrawState.Errored]: "error",
    [WithdrawState.Rejected]: "error",
    [WithdrawState.Skipped]: "error",
  },
  [CurrencyType.Coin]: {
    [WithdrawState.Prepared]: "processing",
    [WithdrawState.Submitted]: "processing",
    [WithdrawState.Processing]: "processing",
    [WithdrawState.Canceled]: "warning",
    [WithdrawState.Failed]: "warning",
    [WithdrawState.Accepted]: "warning",
    [WithdrawState.Succeed]: "success",
    [WithdrawState.Confirming]: "processing",
    [WithdrawState.Errored]: "error",
    [WithdrawState.Rejected]: "error",
    [WithdrawState.Skipped]: "error",
  },
};

export const WithdrawalStatus =  ({ withdrawal }) => {
  const { t: translate } = useTranslation();
  const t = (id) => translate(`setter.layouts.operations.withdrawals.${id}`);

const [withdrawalState] = useState(withdrawal.state);


  return <Tag color='warning'>{t(`table.state.${withdrawalState}`)}</Tag>;
};
