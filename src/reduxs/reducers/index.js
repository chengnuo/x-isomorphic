/**
 * Created by xujunchao on 2017/6/27.
 */
import { combineReducers } from 'redux'
import * as actions from 'REDUXS/actions';

function todoReducers(state = {

}, action) {
    switch (action.type) {
        case actions.ADD_TODO:
            console.log("你好",action);
            return state;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    todo: todoReducers,
})

export default rootReducer