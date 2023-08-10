import { call, delay, put } from "redux-saga/effects"
import { APIREQ } from "../../../../api/API"
import { AlertPush, AlertRemove } from "../../AlertPush"
import { API_CALL_ENDPOINT } from "../../../../api/confing"
import { setAdminData } from "../action"

export function* HandelApiset() {

   try {
      const token = sessionStorage.getItem('token')
      const { data } = yield call(APIREQ, { method: API_CALL_ENDPOINT.methed_post, url: `${API_CALL_ENDPOINT.base_api_verson}/${API_CALL_ENDPOINT.Protected}`, token });
      if(data.statusCode === 200){
        yield put(setAdminData(data.data));
        sessionStorage.setItem('login',true)
      }else{
         yield put(AlertPush({ message_type: 'msg', message: data.message.error, show: 'error' }));
         yield delay(1000);
         yield put(AlertRemove());
         sessionStorage.setItem('login',false)
         if(data.statusCode === 403){
            sessionStorage.clear();
            ///window.location.href  = '/'
         }
         
      }
   } catch (error) {
      yield put(AlertPush({ message_type: 'msg', message: error.message, show: 'error' }));
      yield delay(1000);
      yield put(AlertRemove());

      //sessionStorage.setItem('token',Math.random())
      
   }
}

