import * as ActionTypes from '../ActionTypes';

export const DKTCCTrench = (state = { 
    isLoading: true,
    errMess: null,
    dktccTrench:[]
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DKTCC_TRENCH:
            return {...state, isLoading: false, errMess: null, dktccTrench: action.payload};

        case ActionTypes.JOINT_LOADING:
            return {...state, isLoading: true, errMess: null, dktccTrench: []}

        case ActionTypes.JOINT_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};