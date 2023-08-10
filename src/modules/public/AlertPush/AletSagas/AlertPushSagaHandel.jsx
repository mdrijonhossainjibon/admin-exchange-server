import { delay, put } from "redux-saga/effects"
import { Add_Notic, AlertRemove } from "../action"

export function* AlertPushSagaHandel(action) {

  if (action.message_type) {
    yield put(Add_Notic({message_type : action.message_type,message : action.message,show : action.show ? action.show : null}))
    yield delay(2000)
    yield put(AlertRemove())
  }

}