import {combineReducers} from "redux";
import cusReducer from './cusReducer';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';


export default combineReducers({

    item : itemReducer,
    cus : cusReducer,
    error : errorReducer
});