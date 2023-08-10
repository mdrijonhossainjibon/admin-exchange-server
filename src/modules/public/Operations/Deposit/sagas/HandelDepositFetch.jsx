import { call, delay, put } from "redux-saga/effects"
import { APIREQ, API_CALL_ENDPOINT, RPC_JSON_API } from "../../../../../api"
import { setDepositData } from "../action";
import { AlertPush, AlertRemove } from "../../../AlertPush";


export function * HandelDepositFetch (action) {
   
    try {
        
       const { data } = yield call(APIREQ,{url : `${API_CALL_ENDPOINT.base_api_verson}/deposit`});
       yield put(setDepositData(data.result))
       if(action.payload?.setreload){
          yield put(AlertPush({message_type : 'msg',message : 'Reaload Susss'}));
          yield delay(3000);
          action.payload?.setreload(false);
          yield put(AlertRemove())
       }
    } catch (error) {
        if(action.payload?.setreload){
             
              yield put(AlertPush({message_type : 'msg',message : error.message,show : 'error'}));
              yield delay(3000);
              action.payload?.setreload(false);
              yield put(AlertRemove())
         }

    }
}