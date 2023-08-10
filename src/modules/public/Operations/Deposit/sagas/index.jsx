import { takeLatest } from "redux-saga/effects";
import { FETCH_DEPOSIT } from "../constants";
import { HandelDepositFetch } from "./HandelDepositFetch";

export function  * RootDepositSagas() {
    yield takeLatest(FETCH_DEPOSIT,HandelDepositFetch)
}