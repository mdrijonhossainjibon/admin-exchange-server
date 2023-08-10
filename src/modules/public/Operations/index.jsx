import { combineReducers } from 'redux';
import { DepositReducer } from './Deposit';

/**
 * @private Operations => combineReducers
 * @example import { Operations } from './public'
 */



export const Operations = combineReducers({
    Deposit : DepositReducer
})

export * from './Deposit';