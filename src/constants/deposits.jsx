export const DepositAction = {
    Cancel : "cancel",
    Reject : "reject",
    Accept : "accept",
    Skip : "skip",
    Dispatch : "dispatch",
    Processing : 'processing'
  }
  
  export const DepositState ={
    Accepted : "accepted",
    Submitted : "submitted",
    Rejected : "rejected",
    Collected : "collected",
    Skipped : "skipped",
    Canceled : "canceled",
    Processing : 'processing'
  }
  
  export const DepositTypes = {
    Coin : "coin",
    Fiat : "fiat",
  }
  
  export const newInitialData = {
    options: [
      {
        key: "erc20_contract_address",
        value: "",
      },
      {
        key: "gas_price",
        value: "",
      },
      {
        key: "gas_limit",
        value: "",
      },
    ],
  };
  