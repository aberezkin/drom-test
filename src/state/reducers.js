import { combineReducers } from 'redux';
import {
  ADD_ORDER,
  CHANGE_CITY,
  RECEIVE_CITIES,
  RECEIVE_TIMETABLE, REMOVE_ORDER,
  REQUEST_CITIES,
  REQUEST_TIMETABLE, SEND_ORDER, SET_ORDERS
} from "./actions";

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

const ordersDefault = {
  isPending: false,
  items: []
};

const orders = (state = ordersDefault, { type, ...payload }) => {
  switch (type) {
    case SET_ORDERS:
      return {
        isPending: false,
        items: payload.orders,
      };
    case SEND_ORDER:
      return {
        ...state,
        isPending: true
      };
    case ADD_ORDER:
      return {
        isPending: false,
        items: [
          ...state.items,
          payload,
        ],
      };
    case REMOVE_ORDER:
      return {
        ...state,
        items: state.filter((order) => order.id === payload.id),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cities,
  timetable,
  orders,
});

export default rootReducer;
