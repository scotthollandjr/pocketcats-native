import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  NAME_CHANGED,
  TYPE_CHANGED,
  DESCRIPTION_CHANGED,
  AGE_CHANGED,
} from './types';

export const nameChanged = (text) => {
  return {
    type: NAME_CHANGED,
    payload: text
  };
};

export const typeChanged = (text) => {
  return {
    type: TYPE_CHANGED,
    payload: text
  };
};

export const descriptionChanged = (text) => {
  return {
    type: DESCRIPTION_CHANGED,
    payload: text
  };
};

export const ageChanged = (text) => {
  return {
    type: AGE_CHANGED,
    payload: text
  };
};
