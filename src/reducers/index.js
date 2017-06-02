import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MapReducer from './MapReducer';
import NewCatReducer from './NewCatReducer';

export default combineReducers({
  auth: AuthReducer,
  map: MapReducer,
  newCat: NewCatReducer,
})
