import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from "./reducers";
import { fetchCitiesIfNeeded, setOrders } from "./actions";

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
);

const localStorage = window.localStorage;
const orders = JSON.parse(localStorage.getItem('orders'));

store.dispatch(setOrders(orders));
store.dispatch(fetchCitiesIfNeeded());

export default store;
