import { call, delay, put } from "redux-saga/effects"
import { APIREQ } from "../../../../api/API"
import { AlertPush, AlertRemove } from "../../AlertPush"
import { API_CALL_ENDPOINT } from "../../../../api/confing";
import { fetchAdminToken } from "../action";

export function* handleAdminsaga(action) {
    if (!action.payload) return;

    try {
        const { email, otp_code, password } = action.payload;
        yield delay(1000)
        const { data } = yield call(APIREQ, { method: API_CALL_ENDPOINT.methed_post, url: `${API_CALL_ENDPOINT.base_api_verson}${API_CALL_ENDPOINT.login}`, body: { email, otp_code, password } });

        if (data.statusCode === 200) {

            sessionStorage.setItem('token', data.data)
            yield delay(2500);
            yield put(fetchAdminToken())
            yield put(AlertPush({ message_type: 'msg', message: 'Login sucesfull' }));
            action.payload.setLoading(false)
            yield delay(1000);
            yield put(AlertRemove())
            yield delay(2000);
            action.payload.setisModelvisble(false)
            ///window.location.href = '/'
        } else {
            yield put(AlertPush({ message_type: 'msg', message: data.message.error, show: 'error' }));
            yield delay(1000);
            yield put(AlertRemove())
            yield delay(1000)
            action.payload.setLoading(false)
            yield delay(1000)
            action.payload.setisModelvisble(false)
            yield delay(1000)
            action.payload.setisModelvisble(true)
        }
    } catch (error) {

        yield put(AlertPush({ message_type: 'msg', message: error.message, show: 'error' }));
        yield delay(1000);
        yield put(AlertRemove())
        yield delay(1000)
        action.payload.setLoading(false)
        yield delay(1000)
        action.payload.setisModelvisble(false)
        yield delay(1000)
        action.payload.setisModelvisble(true)

    }
}

