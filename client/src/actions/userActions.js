import {USER_LOADING,USER_LOADED,REGISTER_FAIL,REGISTER_SUCCESS,LOGOUT_SUCCESS,LOGIN_FAIL,LOGIN_SUCCESS,AUTH_ERROR} from "./types";
import {returnErrors} from "./errorActions";
import axios from 'axios';




/////////////////////////////////////////////////////////////////////////////
/*Action For Login*/
export const login = ({email , userPw}) => dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    const body = JSON.stringify({email, userPw});


    //Request to api
    axios.post('http://localhost:5000/api/user/login', body, config).then(res => dispatch({
        type:LOGIN_SUCCESS,
        payload: res.data
    })).catch(error => {
        dispatch(returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL'));
        dispatch({
            type: LOGIN_FAIL
        }) ;
    });

}


/////////////////////////////////////////////////////////////////////////////////
export const loadUser = () => (dispatch, getState) => {
    dispatch ({type: USER_LOADING});

    //Request to api
    axios.get('http://localhost:5000/api/api/user/get/user', tokenConfig(getState)).then(res => dispatch({
        type: USER_LOADED,
        payload: res.data
    })).catch(error => {
       // dispatch(returnErrors(error.response.data, error.response.status));
        dispatch({
            type:AUTH_ERROR
        })
    });
}

/////////////////////////////////////////////////////////////////////////////////////////
/*Action For Register*/
export const register = ({email, userPw, fName, lName, phone, addr}) => dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    const body = JSON.stringify({email, userPw, fName, lName, phone, addr});



    //Request to api
    axios.post('http://localhost:5000/api/user/register', body, config).then(res => dispatch({
        type:REGISTER_SUCCESS,
        payload: res.data
    })).catch(error => {
        dispatch(returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL'));
        dispatch({
           type: REGISTER_FAIL
       }) ;
    });

}
/////////////////////////////////////////////////////////////////////
/*Action For Logout*/
export const logout = () => {
    return{
        type : LOGOUT_SUCCESS
    };
};



//////////////////////////////////////////////////////////////////////
export const tokenConfig = (getState) => {
    const token = getState().user.token;
    const config = {
        headers : {
            "Content-type": "application/json"
        }
    }

    if(token){
        config.headers['user_auth'] = token;
    }
    return config;
}