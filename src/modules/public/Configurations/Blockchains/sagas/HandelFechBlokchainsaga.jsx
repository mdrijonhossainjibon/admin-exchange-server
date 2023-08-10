import { call, delay, put } from "redux-saga/effects";
import { AlertPush, AlertRemove } from "../../../AlertPush";
import { APIREQ, API_CALL_ENDPOINT } from "../../../../../api";
import { Set_Blockchain } from "../action";

export function* HandelFechBlokchainsaga(action) {
    try {
        const { data } = yield call(APIREQ, { url: `${API_CALL_ENDPOINT.base_api_verson}/blockchain/getall` });
       
        
        if (data?.result.length > 0) {
            yield put(Set_Blockchain(data?.result));
            
            if (action?.payload?.setreload) {
                yield delay(2000)
                action.payload.setreload(false)
                yield put(AlertPush({ message_type: "msg", message: 'Reload Success' }));
                yield delay(1000);
                yield put(AlertRemove());
                yield put(Set_Blockchain(data?.result));
            } else if(action?.payload?.loading)  {
                yield put(Set_Blockchain(data?.result));
                yield put(AlertPush({ message_type: "msg", message: data.message.success }));
                yield delay(1000);
                yield put(AlertRemove());
            }
        }else if(action?.payload?.setreload)  {
            action.payload.setreload(false)
            yield put(Set_Blockchain(data?.result));
            yield put(AlertPush({ message_type: "msg", message: data.message.error ,show : 'error'}));
            yield delay(1000);
            yield put(AlertRemove());
        }

    } catch (error) {
        yield put(AlertPush({ message_type: "msg", message: error.message, show: "error" }));
        yield delay(1000);
        yield put(AlertRemove());
        if(action?.payload?.setreload)  {
            action.payload.setreload(false)
        }
    }
}