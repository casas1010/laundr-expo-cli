import {ADD_USER_INFORMATION,REMOVE_USER_INFORMATION} from '../actions/types';

const userData = {
  email: '',
  fname: '',
  lname: '',
  city: '',
  phone: '',
  password: '',
  usedReferral: '',
  isWasher: false,
  isDriver: false,
  isAdmin: false,
  stripe: {
    regPaymentID: 'N/A',
    customerID: 'N/A',
  },
  subscription: {
    id: 'N/A',
    anchorDate: 'N/A',
    startDate: 'N/A',
    periodStart: 'N/A',
    periodEnd: 'N/A',
    plan: 'N/A',
    status: 'N/A',
    lbsLeft: 0,
  },
};

const userReducer = (state = userData, action) => {
  switch (action.type) {
    case ADD_USER_INFORMATION:
      console.log('inside reducer   ADD_USER_INFORMATION')
      return {...action.payload};
    case REMOVE_USER_INFORMATION:
      return state.filter((cartItem) => cartItem.id !== action.payload.id);
    default:
      return state;
  }
};

export default userReducer;
