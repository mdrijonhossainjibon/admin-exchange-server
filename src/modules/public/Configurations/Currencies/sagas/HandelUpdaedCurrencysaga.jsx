import { call, delay, put } from "redux-saga/effects"
import {Update_Currency_Find } from "../action"
import { APIREQ, API_CALL_ENDPOINT } from "../../../../../api"
import { AlertPush, AlertRemove } from "../../../AlertPush"

export function * HandelUpdaedCurrencysaga (action){
    try {

      const   body =  action?.payload
      const { data } = yield call(APIREQ,{ method : API_CALL_ENDPOINT.methed_post, url : `${API_CALL_ENDPOINT.base_api_verson}/currencies/${action?.payload?.code}`,body})

      if(data?.StatusCode === 200){
        yield put(AlertPush({message_type : 'msg',message : data?.message?.success}))
        yield put(Update_Currency_Find(data.result));
        yield delay(2000)
        yield put(AlertRemove())
      }else{
        yield put(AlertPush({message_type : 'msg',message : data?.message?.error, show : 'error'}))
        yield delay(2000)
        yield put(AlertRemove())
      }
      
    } catch (error) {
      yield put(AlertPush({message_type : 'msg',message : error?.message, show : 'error'}))
      yield delay(2000)
      yield put(AlertRemove())
    }
}