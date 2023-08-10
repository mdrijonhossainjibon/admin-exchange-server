import { call, delay, put } from "redux-saga/effects"
import { APIREQ, API_CALL_ENDPOINT } from "../../../../../api"
import { Add_Currency_Data } from "../action"
import { AlertPush, AlertRemove } from "../../../AlertPush"

export function* HandelCurrencisFecthsaga(action) {
  try {

    const { data } = yield call(APIREQ, { method: API_CALL_ENDPOINT.methed_get, url: `${API_CALL_ENDPOINT.base_api_verson}/currencies/getall`, })
    yield put(Add_Currency_Data(data?.result))
    if (data?.StatusCode === 200) {
     
      yield delay(2000);
      if (action?.payload) {
        yield put(AlertPush({ message_type: "msg", message: 'Reload Success' }));
        yield delay(2000);
        action?.payload?.(false);
        yield put(AlertRemove());
      } 
    } else {
      yield put(AlertPush({ message_type: "msg", message: data.message.error, show: 'error' }));
      yield delay(2000);
      action?.payload?.(false);
      yield delay(1000);
      yield put(AlertRemove());
    }


  } catch (error) {
    yield put(AlertPush({ message_type: "msg", message: error.message, show: "error" }));
    yield delay(2000);
    action?.payload?.(false);
    yield put(AlertRemove());
  }
}