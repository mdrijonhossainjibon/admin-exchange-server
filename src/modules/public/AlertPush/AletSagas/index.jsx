import { takeLatest } from "redux-saga/effects";
import { ALERT_PUSH } from "../constanst";
import { AlertPushSagaHandel } from "./AlertPushSagaHandel";

export function * AlertPushSaga (){
   yield takeLatest(ALERT_PUSH,AlertPushSagaHandel)
}