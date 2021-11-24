import * as ActionTypes from '../ActionTypes';

export const SouthFeeder = (state = { 
    isLoading: true,
    errMess: null,
    southFeeder:[]
}, action) => {
    switch (action.type) {
        case ActionTypes.South_ADD_Feeder:
            return {...state, isLoading: false, errMess: null, southFeeder: action.payload};

        case ActionTypes.South_Feeder_LOADING:
            return {...state, isLoading: true, errMess: null, southFeeder: []}

        case ActionTypes.South_Feeder_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};