import { Actions } from 'react-native-router-flux';
import {
  SELECT_CAT,
} from './types';

export const selectCat = (cat) => {
  return {
    type: SELECT_CAT,
    payload: cat,
  };
};
