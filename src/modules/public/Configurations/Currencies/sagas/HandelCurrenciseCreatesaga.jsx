import { call, delay, put } from "redux-saga/effects"
import { APIREQ, API_CALL_ENDPOINT } from "../../../../../api"
import { Currency_Fecth } from "../action";
import { AlertPush, AlertRemove } from "../../../AlertPush";

export function* HandelCurrenciseCreatesaga(action) {
  try {
    const { options, value } = action.payload;
    const { data } = yield call(APIREQ, { method: API_CALL_ENDPOINT.methed_post, url: `${API_CALL_ENDPOINT.base_api_verson}/currencies`, body: { value, options } })
    if (data?.StatusCode === 200) {
      yield put(Currency_Fecth());
      yield put(AlertPush({ message_type: "msg", message: data.message.success }));
      yield delay(2000);
      yield delay(1000);
      yield put(AlertRemove());
    } else {
      yield put(AlertPush({ message_type: "msg", message: data.message.error, show: 'error' }));
      yield delay(2000);
      yield delay(1000);
      yield put(AlertRemove());
    }
  } catch (error) {
    yield put(AlertPush({ message_type: "msg", message: error.message, show: "error" }));
    yield delay(2000);

    yield put(AlertRemove());
  }
}