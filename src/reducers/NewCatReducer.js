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
} from '../actions/types';

const INITIAL_STATE = {
  id: '',
  age: '',
  description: '',
  gender: '',
  image: '',
  location: '',
  logged: '',
  name: '',
  tagged: '',
  type: '',
  user: '',
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case AGE_CHANGED:
      return { ...state, age: action.payload };
    case DESCRIPTION_CHANGED:
      return { ...state, description: action.payload };
    case GENDER_CHANGED:
      return { ...state, gender: action.payload };
    case IMAGE_CHANGED:
      return { ...state, image: action.payload };
    case LOCATION_CHANGED:
      return { ...state, location: action.payload };
    case LOGGED_CHANGED:
      return { ...state, logged: action.payload };
    case NAME_CHANGED:
      return { ...state, name: action.payload };
    case TAGGED_CHANGED:
      return { ...state, tagged: action.payload };
    case TYPE_CHANGED:
      return { ...state, type: action.payload };
    case ADD_CAT:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
}
