import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../modules';

const loggerMiddleware = createLogger();

export const store = createStore(rootReducer, applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
