import { UPDATE_CURRENCIES_FECH ,ADD_CURRENCIES_DATA, CURRENCIES_FECH,UPDATE_CURRENCIES,Create_CURRENCIES} from "./constants"

export const Update_Currency_Find = (payload)=>({
    type : 'UPDATE_CURRENCIES_DATA_FIND',
    payload
})

export const Update_Currency_Fecth =  (payload)=>({
    type : UPDATE_CURRENCIES_FECH,
    payload
})
export const Add_Currency_Data =(payload)=>({
    type : ADD_CURRENCIES_DATA,
    payload
})

export const Currency_Fecth = (payload)=>({
    type : CURRENCIES_FECH,
    payload
})


export const Update_Currency = (payload)=>({
    type : UPDATE_CURRENCIES,
    payload
});
export const Create_Currency = (payload)=>({
    type : Create_CURRENCIES,
    payload
})