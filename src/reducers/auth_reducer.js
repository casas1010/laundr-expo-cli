import {
    EMAIL_LOGIN_SUCCESS,
    EMAIL_LOGIN_FAIL,
    LOG_OUT,
  } from "../actions/types";
  
  const authReducer = (state = {}, action) => {
    switch (action.type) {
      case EMAIL_LOGIN_SUCCESS:
        console.log('Email Login Success')
        return { token: action.payload };
  
      case EMAIL_LOGIN_FAIL:
        return { token: null };
  
      case LOG_OUT:
        console.log('token has been cleared from the store')
        return { token: null };
  
      default:
        return state;
    }
  };
  
  export default authReducer;
  