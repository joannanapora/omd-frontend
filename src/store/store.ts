import rootReducer from './root-reducer';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist'

export const store = createStore(rootReducer, composeWithDevTools());

export const persistor = persistStore(store);

export default { persistor, store };