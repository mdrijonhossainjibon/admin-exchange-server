import { CREATE_DEPOSIT, FETCH_DEPOSIT, FIND_AND_UPDATED_DEPOSIT, SET_DEPOSIT_DATA, UPDATED_DEPOSIT_DATA } from "./constants";

export const fetchDeposit = (payload)=> ({
  type : FETCH_DEPOSIT,
  payload
})

export const setDepositData =(payload)=>({
    type : SET_DEPOSIT_DATA,
    payload
});

export const UpdatedDepositData = (payload) =>({
  type : UPDATED_DEPOSIT_DATA,
  payload
})

export const FindAndUpdatedDeposit = (payload) => ({
    type : FIND_AND_UPDATED_DEPOSIT,
    payload
});
export const CreateDeposit = (payload) => ({
    type : CREATE_DEPOSIT,
    payload
})