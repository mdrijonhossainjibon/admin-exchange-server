import { takeLatest } from "redux-saga/effects";
import { CURRENCIES_FECH, Create_CURRENCIES, UPDATE_CURRENCIES_FECH } from "../constants";
import { HandelUpdaedCurrencysaga } from "./HandelUpdaedCurrencysaga";
import { HandelCurrencisFecthsaga } from "./HandelCurrencisFecthsaga";
import { HandelCurrenciseCreatesaga } from './HandelCurrenciseCreatesaga'
export function * RootCurrencySagas (){
    yield takeLatest(UPDATE_CURRENCIES_FECH,HandelUpdaedCurrencysaga)
    yield takeLatest(CURRENCIES_FECH,HandelCurrencisFecthsaga);
    yield takeLatest(Create_CURRENCIES,HandelCurrenciseCreatesaga)
    
}