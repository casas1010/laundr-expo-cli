import {ADD_USER_INFORMATION} from '../actions/types';

export const addUserInformation = (product) => {
    console.log('addUserInformation() action has been called')
  // perform action
  return {
    type: ADD_USER_INFORMATION,
    payload: product,
  };
};


