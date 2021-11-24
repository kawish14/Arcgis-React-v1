import * as ActionTypes from '../ActionTypes';

export const SouthDistribution = (state = { 
    isLoading: true,
    errMess: null,
    southDistribution:[]
}, action) => {
    switch (action.type) {
        case ActionTypes.South_ADD_Distribution:
            return {...state, isLoading: false, errMess: null, southDistribution: action.payload};

        case ActionTypes.South_Distribution_LOADING:
            return {...state, isLoading: true, errMess: null, southDistribution: []}

        case ActionTypes.South_Distribution_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};