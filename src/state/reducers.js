import { combineReducers } from 'redux';
import { CHANGE_CITY, RECEIVE_CITIES, RECEIVE_TIMETABLE, REQUEST_CITIES, REQUEST_TIMETABLE } from "./actions";

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
        isFetching: false,
        items: payload.cities,
      };
    default:
      return state;
  }
};

const timetableDefault = {
  isFetching: false,
  items: { }
};

const timetable = (state = timetableDefault, { type, ...payload }) => {
  switch (type) {
    case REQUEST_TIMETABLE:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_TIMETABLE:
      return {
        ...state,
        items: {
          ...state.items,
          [payload.city]: payload.data,
        },
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cities,
  timetable,
});

export default rootReducer;
