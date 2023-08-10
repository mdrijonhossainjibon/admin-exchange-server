import { call, delay, put } from "redux-saga/effects";
import { AlertPush, AlertRemove, setUser } from "../../";
import {  APIREQ, API_CALL_ENDPOINT } from "../../../../api/";

export function * handelUsersSaga(){
    try {
       const { data } = yield call(APIREQ,{url : `${API_CALL_ENDPOINT.base_api_verson}${API_CALL_ENDPOINT.usersget}`})
 
      
      if(data.StatusCode === 200){
        console.log(data.Data)
        yield put(setUser(data.Data))
      }
    } catch (error) {
        yield put(AlertPush({ message_type: 'msg', message: error.message, show: 'error' }));
        yield delay(1000);
        yield put(AlertRemove())
    }
}