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
    .then(response => response.json())
    .then(json => dispatch(receiveCities(json)));
};

export const fetchCitiesIfNeeded = () => (dispatch, getState) => {
  const cities = getState().cities.items;
  if (cities.length > 0) return Promise.resolve();
  return dispatch(fetchCities());
};

