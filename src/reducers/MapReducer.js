import {
  SELECT_CAT,
} from '../actions/types';

const INITIAL_STATE = {
  cat: null,
  showModal: false,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SELECT_CAT:
      return { ...state, cat: action.payload};
    default:
      return state;
  }
}
