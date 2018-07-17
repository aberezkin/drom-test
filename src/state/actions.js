import fetch from 'cross-fetch';

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
