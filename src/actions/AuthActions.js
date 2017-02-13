import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  CONPASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  DISPLAY_ERROR,
  SIGNUP_USER
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const conPasswordChanged = (text) => {
  return {
    type: CONPASSWORD_CHANGED,
    payload: text
  }
}

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => displayError(dispatch, error.message));
  };
};

export const signupUser = ({ email, password, conPassword }) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_USER });

    if (password == conPassword) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch((error) => displayError(dispatch, error.message));
    } else {
      console.log("passwords no match");
      let error = "Passwords do not match";
      displayError(dispatch, error)
    }
  }
}

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};

const displayError = (dispatch, error) => {
  dispatch({
    type: DISPLAY_ERROR,
    payload: error
  });
};
