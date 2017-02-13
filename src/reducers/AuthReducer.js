import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  CONPASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  SIGNUP_USER,
  DISPLAY_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  conPassword: '',
  user: null,
  error: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case CONPASSWORD_CHANGED:
      return { ...state, conPassword: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case SIGNUP_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state,
        error: 'Authentication Failed',
        password: '',
        conPassword: '',
        loading: false
      };
    case DISPLAY_ERROR:
      return { ...state,
        password: '',
        conPassword: '',
        loading: false,
        error: action.payload };
    default:
      return state;
  }
}
