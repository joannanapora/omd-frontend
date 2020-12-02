import { combineReducers } from 'redux';
import filtersReducer from './filters/filter.reducer';
import userReducer from './user/user.reducer';

export default combineReducers({
    user: userReducer,
    filter: filtersReducer,
});