import {combineReducers} from "redux";
import userReducer from './userReducer';
import errorReducer from './errorReducer';


export default combineReducers({

    /*Combining user Reducer and Error Reducer to Root Reducer*/
    user : userReducer,
    error : errorReducer
});