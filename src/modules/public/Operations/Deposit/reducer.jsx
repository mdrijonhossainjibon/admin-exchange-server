import { SET_DEPOSIT_DATA } from "./constants";

export const DepositReducer = (state = [], action) => {

  switch (action.type) {
    case SET_DEPOSIT_DATA:
      return [...action.payload]
    default:
      return state
  }
}