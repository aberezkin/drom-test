import fetch from 'cross-fetch';

const generateUniqueId = () => Math.random().toString(36).substr(2, 32);

export const CHANGE_CITY = 'CHANGE_CITY';
export const changeCity = (city) => ({
  type: CHANGE_CITY,
  city
});

export const REQUEST_CITIES = 'REQUEST_CITIES';
const requestCities = () => ({
  type: REQUEST_CITIES,
});

export const RECEIVE_CITIES = 'RECEIVE_CITIES';
const receiveCities = (json) => {
  return {
    type: RECEIVE_CITIES,
    cities: json.cities,
  }
};

const fetchCities = () => (dispatch) => {
  dispatch(requestCities());
  return fetch('https://www.mocky.io/v2/5b34c0d82f00007400376066?mocky-delay=700ms')
    .then(res => res.json())
    .then(json => dispatch(receiveCities(json)));
};

export const fetchCitiesIfNeeded = () => (dispatch, getState) => {
  const cities = getState().cities.items;
  if (cities.length > 0) return Promise.resolve();
  return dispatch(fetchCities())
    .then(action => dispatch(changeCity(action.cities[0].id)))
    .then(action => dispatch(fetchTimetableIfNeeded(action.city)));
};

export const REQUEST_TIMETABLE = 'REQUEST_TIMETABLE';
const requestTimetable = (city) => ({
  type: REQUEST_TIMETABLE,
  city,
});

export const RECEIVE_TIMETABLE = 'RECEIVE_TIMETABLE';
const receiveTimetable = (city, rawData) => {
  const data = Object.keys(rawData).map((date) => {
    const dateInfo = rawData[date];
    return {
      date,
      times: Object.keys(dateInfo)
        .map((time) => dateInfo[time])
        .filter((timeInfo) => !timeInfo.is_not_free),
    }
  }).filter((item) => item.times.length > 0);

  return {
    type: RECEIVE_TIMETABLE,
    city,
    data,
  }
};

const fetchTimetable = (city) => (dispatch) => {
  dispatch(requestTimetable(city));
  return fetch(`https://www.mocky.io/v2/${city}?mocky-delay=700ms`)
    .then(res => res.json())
    .then(json => dispatch(receiveTimetable(city, json.data)))
};

export const fetchTimetableIfNeeded = (city) => (dispatch, getState) => {
  const timetable = getState().timetable.items[city];
  if (timetable) return Promise.resolve();
  return dispatch(fetchTimetable(city));
};

export const SET_ORDERS = 'SET_ORDERS';
export const setOrders = (orders) => ({
  type: SET_ORDERS,
  orders
});

export const SEND_ORDER = 'SEND_ORDER';
export const sendOrder = () => ({
  type: SEND_ORDER,
});

export const ADD_ORDER = 'ADD_ORDER';
export const addOrder = (data) => ({
  type: ADD_ORDER,
  ...data,
});

export const REMOVE_ORDER = 'REMOVE_ORDER';
export const removeOrder = (id) => ({
  type: REMOVE_ORDER,
  id: id,
});

const localStorage = window.localStorage;

export const putOrder = (data) => (dispatch, getState) => {
  const order = {
    id: generateUniqueId(),
    ...data
  };

  dispatch(sendOrder());
  return new Promise((resolve) => {
    const id = setTimeout(() => {
      clearTimeout(id);

      dispatch(addOrder(order));
      const orders = getState().orders.items;

      localStorage.setItem('orders', JSON.stringify(orders));
      resolve();
    }, 700)
  })
};

export const deleteOrder = (id) => (dispatch, getState) => {
  dispatch(removeOrder(id));
  const orders = getState().orders.items;
  localStorage.setItem('orders', JSON.stringify(orders));
};
