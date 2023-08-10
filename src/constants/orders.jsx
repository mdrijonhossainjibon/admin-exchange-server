
export const OrderFetchType ={
  History : "history",
  Open : "open",
}

export const  OrderSide = {
  Buy :"buy",
  Sell : "sell",
}

export const OrderState = {
  Pending : "pending",
  Wait : "wait",
  Done : "done",
  Cancel : "cancel",
  Reject : "reject",
}

export const OrderSideColors = {
  [OrderSide.Sell]: "success",
  [OrderSide.Buy]: "danger",
};
