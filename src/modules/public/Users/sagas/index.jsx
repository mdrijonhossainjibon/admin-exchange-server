import { takeLatest } from "redux-saga/effects";
import { FETCH_USER, UserdataUpdate } from "../constanst";
import { handelUsersSaga } from "./handelUsersSaga";
import { HandelUpdateSaga } from "./handelUpdate.saga";

export function * RootfetchUserSaga(){
    yield takeLatest(FETCH_USER,handelUsersSaga);
    yield takeLatest(UserdataUpdate,HandelUpdateSaga)
}