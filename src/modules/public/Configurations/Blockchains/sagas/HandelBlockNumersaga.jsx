import { call, delay, put } from "redux-saga/effects";
import { AlertPush, AlertRemove } from "../../../AlertPush";
import { APIREQ, API_CALL_ENDPOINT, WebsooketProvider} from "../../../../../api";
import { Update_Blochain_Find } from "../action";
import { ethers } from "ethers";

export function* HandelBlockNumersaga(action) {
  try {

    

    const providerEndpoint = action.payload.server;
    
    if (!providerEndpoint) {
      throw new Error("Invalid provider endpoint"); // Throw an error if the server value is missing or invalid
    }

    const Provider = new ethers.JsonRpcProvider(providerEndpoint);
    
    const data = yield call(() => Provider.getBlockNumber()); // Use `call` effect to make the asynchronous call
    
    yield put(Update_Blochain_Find({ key: action.payload.key, height: data }));
  } catch (error) {
    yield put(AlertPush({ message_type: "msg", message: error.message, show: "error" }));
    yield delay(1000);
    yield put(AlertRemove());
  }
}
