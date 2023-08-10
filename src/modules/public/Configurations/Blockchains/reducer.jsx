import { ADD_BLOCKCHAIN_DATA, UPDATE_BLOCKCHAIN_DATA, UPDATE_BLOCKCHAIN_DATA_FIND } from "./constants";

const initialState = ''

// Define the reducer function

/**
*@private use Blockchain initialState ||  '';
*@param use action   
*@example  const DATAGET = (payload)=>({
    type : 'DATAGET',
    payload
})
*/


// Define the reducer function
export const Blockchain_reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BLOCKCHAIN_DATA:

            return [...action.payload]

        case UPDATE_BLOCKCHAIN_DATA_FIND:
            return state?.map(item =>
                item.key === action.payload.key ? { ...item, ...action.payload } : item
            );
        case UPDATE_BLOCKCHAIN_DATA:
            const { key ,name ,client, height ,explorer_address,explorer_transaction,min_confirmations,server,enabled,created_at} =  action.payload
            const existingItem = state?.find(item => item.key === action.payload.key);
            if (existingItem) {
                return state; // Do not add a new object if key already exists
            } else {
                return [...state, {
                    id : state.length + 1,
                    key,
                    name,
                    client,
                    height,
                    explorer_address,
                    explorer_transaction,
                    min_confirmations,
                    server ,
                    created_at,
                    enabled
                }]; // Add the new object if key doesn't exist
            }

        default:
            return state;
    }
};



