import { combineReducers } from "redux";

import User from './User';
import Room from './Room';

const rootReducer = combineReducers({
  User,
  Room
});

export default rootReducer;
