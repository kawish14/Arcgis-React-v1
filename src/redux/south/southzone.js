import * as ActionTypes from '../ActionTypes';

export const SouthZone = (state = { 
    isLoading: true,
    errMess: null,
    southZone:[]
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SOUTH_ZONE:
            return {...state, isLoading: false, errMess: null, southZone: action.payload};

        case ActionTypes.SOUTH_ZONE_LOADING:
            return {...state, isLoading: true, errMess: null, southZone: []}

        case ActionTypes.SOUTH_ZONE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};