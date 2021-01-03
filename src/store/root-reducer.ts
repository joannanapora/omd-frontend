import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


import filtersReducer from './filters/filter.reducer';
import userReducer from './user/user.reducer';
import homePageReducer from './homepage/homepage.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
};

const rootReducer = combineReducers({
    user: userReducer,
    filter: filtersReducer,
    homepage: homePageReducer,
});



export default persistReducer(persistConfig, rootReducer);