import * as ActionTypes from '../ActionTypes';

export const DC = (state = { 
    isLoading: true,
    errMess: null,
    dc:[]
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DC:
            return {...state, isLoading: false, errMess: null, dc: action.payload};

        case ActionTypes.DC_LOADING:
            return {...state, isLoading: true, errMess: null, dc: []}

        case ActionTypes.DC_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};