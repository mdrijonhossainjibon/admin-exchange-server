import { ADD_CURRENCIES_DATA, UPDATE_CURRENCIES } from "./constants";

const initialState = [];

// Define the reducer function

/**
*@private use CurrenciesReducer initialState ||  '';
*@param use action   
*@example  const DATAGET = (payload)=>({
    type : 'DATAGET',
    payload
})
*/

export const CurrenciesReducer =(state = initialState ,action)=>{

    switch (action.type) {
        case ADD_CURRENCIES_DATA:
       return [...action.payload]
  
        case 'UPDATE_CURRENCIES_DATA_FIND' : 
        return state?.map(item =>
            item.code === action.payload.code ? { ...item, ...action.payload } : item
        );
        case UPDATE_CURRENCIES:
        const existingItem = state?.find(item => item.code === action?.payload?.code);
        if (existingItem) {
            return state; // Do not add a new object if key already exists
        }else{
            return [...state, action.payload]
        }
        default:
           return state;
    }
}