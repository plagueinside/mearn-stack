import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

import authentication from './authenticationReducer';
import users from './userReducer';
import alert from './alertReducer';

export default combineReducers({
    item: itemReducer,
    authentication,
    users,
    alert

})