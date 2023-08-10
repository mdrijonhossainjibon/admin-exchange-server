import { all, call } from "redux-saga/effects";
import { combineReducers } from "redux";
import { publicReducer } from "./app";
import { AlertPushSaga, RootAdminSaga, RootBlokchainSaga, RootCurrencySagas, RootDepositSagas, RootfetchUserSaga } from "./public";

export const rootReducer = combineReducers({
    public: publicReducer
})

export function* RootSaga() {
    yield all([
        call(AlertPushSaga),
        call(RootAdminSaga),
        call(RootfetchUserSaga),
        call(RootBlokchainSaga),
        call(RootCurrencySagas),
        call(RootDepositSagas),
    ]);
  }

  

export * from './public';

