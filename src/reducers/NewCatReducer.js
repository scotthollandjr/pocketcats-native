import {
  NAME_CHANGED,
  TYPE_CHANGED,
  DESCRIPTION_CHANGED,
  AGE_CHANGED,
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  type: '',
  description: '',
  age: null,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case NAME_CHANGED:
      return { ...state, name: action.payload };
    case TYPE_CHANGED:
      return { ...state, type: action.payload };
    case DESCRIPTION_CHANGED:
      return { ...state, description: action.payload };
    case AGE_CHANGED:
      return { ...state, age: action.payload };
    default:
      return state;
  }
}
