import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
    productDetailsReducer,
    productListReducer,
} from './Reducers/ProductReducers';

// const initialState = {};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
