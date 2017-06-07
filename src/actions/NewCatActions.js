import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  AGE_CHANGED,
  DESCRIPTION_CHANGED,
  GENDER_CHANGED,
  IMAGE_CHANGED,
  LOCATION_CHANGED,
  LOGGED_CHANGED,
  NAME_CHANGED,
  TAGGED_CHANGED,
  TYPE_CHANGED,
  ADD_CAT,
} from './types';
import { realm } from '../components/common';

export const ageChanged = (text) => {
  return {
    type: AGE_CHANGED,
    payload: text
  };
};

export const descriptionChanged = (text) => {
  return {
    type: DESCRIPTION_CHANGED,
    payload: text
  };
};

export const genderChanged = (text) => {
  console.log("gender action", text)
  return {
    type: GENDER_CHANGED,
    payload: text
  };
};

export const imageChanged = (text) => {
  return {
    type: IMAGE_CHANGED,
    payload: text
  };
};

export const locationChanged = (text) => {
  return {
    type: LOCATION_CHANGED,
    payload: text
  };
};

export const loggedChanged = (text) => {
  return {
    type: LOGGED_CHANGED,
    payload: text
  };
};

export const nameChanged = (text) => {
  return {
    type: NAME_CHANGED,
    payload: text
  };
};

export const taggedChanged = (text) => {
  console.log("tagged action", text)
  return {
    type: TAGGED_CHANGED,
    payload: text
  };
};

export const typeChanged = (text) => {
  return {
    type: TYPE_CHANGED,
    payload: text
  };
};

export const addCat = (id, age, description, gender, image, location, logged, name, tagged, type, user) => {
  return (dispatch) => {
    dispatch({ type: ADD_CAT });

    realm.write(() => {
      realm.create('Cat', {
        id:          id,
        age:         age,
        description: description,
        gender:      gender,
        image:       image,
        location:    location,
        logged:      logged,
        name:        name,
        tagged:      tagged,
        type:        type,
        user:        user,
      });
    });

    let cats = realm.objects('Cat');
    let catsArray = cats.map(x => Object.assign({}, x));
    console.log("Cats: ", catsArray)
  };
};
