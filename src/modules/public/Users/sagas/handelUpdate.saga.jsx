import { call, delay, put } from "redux-saga/effects";
import { AlertPush, AlertRemove,fetchUser,updateUser } from "../../";
import {  APIREQ, API_CALL_ENDPOINT } from "../../../../api/";

export function * HandelUpdateSaga (action){
    try {
        const { payload }= action
      const { data } =  yield call(APIREQ,{method : API_CALL_ENDPOINT.methed_post, url : `${API_CALL_ENDPOINT.base_api_verson}/userupdate/handelcase`,body : { payload }});
      
       
       if(data.StatusCode === 200){
        yield put(updateUser(data.result))
       }else{
        yield put(AlertPush({ message_type: 'msg', message: data.message.error, show: 'error' }));
       }
     

    } catch (error) {
        yield put(AlertPush({ message_type: 'msg', message: error.message, show: 'error' }));
        yield delay(1000);
        yield put(AlertRemove())
    }
}