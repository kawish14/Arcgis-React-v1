import * as ActionTypes from '../ActionTypes';

export const Joint = (state = { 
    isLoading: true,
    errMess: null,
    southJoint:[]
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_JOINT:
            return {...state, isLoading: false, errMess: null, southJoint: action.payload};

        case ActionTypes.JOINT_LOADING:
            return {...state, isLoading: true, errMess: null, southJoint: []}

        case ActionTypes.JOINT_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};