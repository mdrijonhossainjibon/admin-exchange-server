import { takeLatest } from "redux-saga/effects";
import { FETCH_ADMIN_DATA, FETCH_ADMIN_TOKEN } from "../constanst";
import { handleAdminsaga } from "./HandelAdminsaga";
import { HandelApiset } from "./HandelApiset";

export function * RootAdminSaga(){
    yield takeLatest(FETCH_ADMIN_DATA,handleAdminsaga)
    yield takeLatest(FETCH_ADMIN_TOKEN,HandelApiset)
}