import * as ActionTypes from '../ActionTypes';

export const FAT = (state = { 
    isLoading: true,
    errMess: null,
    fat:[]
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAT:
            return {...state, isLoading: false, errMess: null, fat: action.payload};

        case ActionTypes.FAT_LOADING:
            return {...state, isLoading: true, errMess: null, fat: []}

        case ActionTypes.FAT_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};