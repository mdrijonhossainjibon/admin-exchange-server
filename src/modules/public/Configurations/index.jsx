import { combineReducers } from 'redux'
import { Blockchain_reducer } from './Blockchains'
import { CurrenciesReducer } from './Currencies/reducer';

/**
 * @private Configurations => combineReducers
 * @example import { Configurations } from './public'
 */

export const Configurations = combineReducers({
    Blockchain : Blockchain_reducer,
    Currencies : CurrenciesReducer
})

export * from './Blockchains';
export * from './Currencies';