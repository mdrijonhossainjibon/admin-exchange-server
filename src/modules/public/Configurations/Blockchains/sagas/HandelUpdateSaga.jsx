import { call, delay, put } from "redux-saga/effects";
import { APIREQ, API_CALL_ENDPOINT } from "../../../../../api";
import { Update_Blochain_Find } from "../action";
import { AlertPush, AlertRemove } from "../../../AlertPush";

export function* HandelUpdateSaga(action) {
    try {
        const { body , t } = action.payload;

        const { data } = yield call(APIREQ, { method: API_CALL_ENDPOINT.methed_post, url: `${API_CALL_ENDPOINT.base_api_verson}/blockchain/updated`,body });

        if (data.result) {
            yield put(Update_Blochain_Find(data.result));
            yield delay(2000)
            yield put(AlertPush({ message_type: "msg",  message: data.message.success }));
            yield delay(1000);
            yield put(AlertRemove());
        }
    } catch (error) {
        yield put(AlertPush({ message_type: "msg", message: error.message, show: "error" }));
        yield delay(1000);
        yield put(AlertRemove());
    }
}