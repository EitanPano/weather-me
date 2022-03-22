import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { locationReducer } from './reducers/locationReducer';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const rootReducer = combineReducers({
    locationModule: locationReducer,
});

export const store = createStore(rootReducer, composedEnhancer);
