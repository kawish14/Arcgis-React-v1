import {createStore, combineReducers,applyMiddleware} from 'redux';

import { DC } from './south/dc';
import { Customer } from './south/customer';
import {SouthZone} from './south/southzone'
import { SouthFeeder } from './south/southFeeder';
import {SouthDistribution} from './south/southDistribution'
import { FAT } from './south/fat';
import {Joint} from './south/joint'
import {SouthPOP} from './south/pop'

import{loginRole} from './mainReducer/login'

import thunk from 'redux-thunk';
import logger from 'redux-logger';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            customer: Customer,
            dc:DC,
            southPOP:SouthPOP,
            southZone:SouthZone,
            southFeeder:SouthFeeder,
            southDistribution:SouthDistribution,
            fat:FAT,
            southJoint:Joint,

            login:loginRole,
         
            
        }),
        
        applyMiddleware(thunk/* , logger */)
    );

    return store
}