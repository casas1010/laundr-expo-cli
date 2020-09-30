import {AsyncStorage} from 'react-native';
import {
  EMAIL_LOGIN_SUCCESS,
  EMAIL_LOGIN_FAIL,
  LOG_OUT,
  ADD_USER_INFORMATION,
} from './types';
import {FAKE_DATA} from '../components/Data/';

// regular syntax
export const emailLogOut = () => {
  // perform action
  return {
    type: LOG_OUT,
  };
};

// async syntax using redux thunk
export const actionName2 = () => async (dispatch) => {
  // perform action
  dispatch({
    // type: ,
    // payload:
  });
};

export const emailLogin = (props) => async (dispatch) => {
  console.log('emailLogin()_2');
  // get the token token if it is there
  let token = await AsyncStorage.getItem('token');

  // check the value of that token
  // if (token) {   //uncomment
  if (false) {
    dispatch({type: EMAIL_LOGIN_SUCCESS, payload: token});
  } else {
    doEmailLogin(dispatch, props);
  }
};

const doEmailLogin = async (dispatch, props) => {
  console.log('start email login');
  // if (this.handleInputValidation()) {   // UNCOMMENT ME
  try {
    // const response = await axios.post('/api/user/login', {     // UNCOMMENT ME
    //   email: props.email.toLowerCase(),
    //   password: props.password,
    // });

    // REMOVE DUMMY DATA
    let response = {
      data: {
        success: true,
        token: 'fakeToken',
      },
    };

    

    // REMOVE DUMMY DATA

    console.log('10');
    if (response.data.success) {
      console.log('20');
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      console.log('30');
      // const data = jwtDecode(token);   // UNCOMMENT ME
      const data = FAKE_DATA;
      dispatch({type: ADD_USER_INFORMATION, payload: data});
      console.log('after');
      return dispatch({type: EMAIL_LOGIN_SUCCESS, payload: token});
    } else {
      console.log('Login failed, token has not been received');

      return dispatch({type: EMAIL_LOGIN_FAIL});
    }
  } catch (error) {
    console.log('Login failed, there has been an error in the request');

    console.log(error);
    return dispatch({type: EMAIL_LOGIN_FAIL});
  }
  // }  // UNCOMMENT ME
};

// starts facebooklogin flow
// const doFacebookLogin = async (dispatch) => {
//   Facebook.initializeAsync("300020044475971", "ScanApp");

//   let { type, token } = await Facebook.logInWithReadPermissionsAsync(
//     "300020044475971",
//     {
//       permissions: ["public_profile"],
//     }
//   );

//   if (type === "cancel") {
//     return dispatch({ type: FACEBOOK_LOGIN_FAIL });
//   }
//   // if it makes it this far, it means that you have login succesfully
//   await AsyncStorage.setItem("fb_token", token);

//   dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
// };
