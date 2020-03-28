import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import createRootReducer from '../reducers';

export const store = createStore(createRootReducer(),   composeWithDevTools());