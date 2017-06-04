import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  NAME_CHANGED,
  TYPE_CHANGED,
  DESCRIPTION_CHANGED,
  LOCATION_CHANGED,
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

export const locationChanged = (text) => {
  return {
    type: LOCATION_CHANGED,
    payload: text
  };
};
