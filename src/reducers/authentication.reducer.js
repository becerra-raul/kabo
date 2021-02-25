import { userConstants } from '../constants';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? {
      loggedIn: true,
      user,
      error: false,
      errorMessage: '',
      authLoading:false
    }
  : {};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        user: action.payload.user,
        error: false,
        errorMessage: '',
        authLoading:true,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        error: false,
        errorMessage: '', 
        authLoading:false,

      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
        authLoading:false,
      };
    case userConstants.LOGOUT:
      localStorage.removeItem('user');
      return {};
    default:
      return state;
  }
};
