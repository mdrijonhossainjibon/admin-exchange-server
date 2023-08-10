import { takeLatest } from "redux-saga/effects";
import { FECH_BLOCKCHAIN, FECH_BLOCKCHAIN_BLOCK_NUMBER ,CreateBlockchain, GET_UPDATED} from "../constants";
import { HandelBlockNumersaga } from "./HandelBlockNumersaga";
import { HandelFechBlokchainsaga } from "./HandelFechBlokchainsaga";
import { HandelBlockchainsagacreate } from "./HandelBlockchainsagacreate";
import { HandelUpdateSaga } from "./HandelUpdateSaga";


export function *  RootBlokchainSaga(){
    yield takeLatest(FECH_BLOCKCHAIN_BLOCK_NUMBER,HandelBlockNumersaga);
    yield takeLatest(FECH_BLOCKCHAIN,HandelFechBlokchainsaga);
    yield takeLatest(CreateBlockchain,HandelBlockchainsagacreate);
    yield takeLatest(GET_UPDATED,HandelUpdateSaga)
}