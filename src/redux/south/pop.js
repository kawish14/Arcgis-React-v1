import * as ActionTypes from '../ActionTypes';

export const SouthPOP = (state = { 
    isLoading: true,
    errMess: null,
    southPOP:[]
}, action) => {
    switch (action.type) {
        case ActionTypes.South_ADD_POP:
            return {...state, isLoading: false, errMess: null, southPOP: action.payload};

        case ActionTypes.South_POP_LOADING:
            return {...state, isLoading: true, errMess: null, southPOP: []}

        case ActionTypes.South_POP_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};