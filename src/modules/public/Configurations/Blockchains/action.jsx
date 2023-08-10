import { ADD_BLOCKCHAIN_DATA, FECH_BLOCKCHAIN,CreateBlockchain ,FECH_BLOCKCHAIN_BLOCK_NUMBER, UPDATE_BLOCKCHAIN_DATA, UPDATE_BLOCKCHAIN_DATA_FIND, GET_UPDATED } from "./constants";



export const Fech_Blockchain = (payload) => ({
    type: FECH_BLOCKCHAIN,
    payload
})

export const Fech_Blockchain_Number = (payload) => ({
    type: FECH_BLOCKCHAIN_BLOCK_NUMBER,
    payload
})

export const Set_Blockchain = (payload) => ({
    type: ADD_BLOCKCHAIN_DATA,
    payload
})

export const Update_Blochain_data = (payload) => ({
    type: UPDATE_BLOCKCHAIN_DATA,
    payload
})

export const Update_Blochain_Find = (payload)=>({
    type : UPDATE_BLOCKCHAIN_DATA_FIND,
    payload
})
export const Create_Blockchain = (payload)=>({
    type : CreateBlockchain,
    payload
})
export const GetUpdated =(payload)=>({
    type : GET_UPDATED,
    payload
})