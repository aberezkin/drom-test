import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from "./reducers";
import { fetchCitiesIfNeeded } from "./actions";

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
);

store.dispatch(fetchCitiesIfNeeded());

export default store;
