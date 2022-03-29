import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { locationReducer } from './reducers/locationReducer';
import { userReducer } from './reducers/userReducer';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const rootReducer = combineReducers({
    locationModule: locationReducer,
    userModule: userReducer,
});

export const store = createStore(rootReducer, composedEnhancer);
