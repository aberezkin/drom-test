import { combineReducers } from 'redux';
import { CHANGE_CITY, RECEIVE_CITIES, REQUEST_CITIES } from "./actions";

const citiesDefault = {
  chosen: null,
  isFetching: false,
  items: []
};

const cities = (state = citiesDefault, { type, ...payload }) => {
  switch (type) {
    case CHANGE_CITY:
      return {
        ...state,
        chosen: payload.city,
      };
    case REQUEST_CITIES:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_CITIES:
      return {
        chosen: payload.cities[0].id,
        isFetching: false,
        items: payload.cities,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cities
});

export default rootReducer;
