import axios from 'axios';

// get woeid of user's location
export const getLocationID = (latt, long) => {
  const url = `https://practical-shaw-309fe4.netlify.app/api/getCityInfo/${latt},${long}`;

  return axios
    .get(url, {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    })
    .catch((error) => console.error(error));
};

// use user's location woeid to get weather forecast
export const getWeatherForecast = (woeid) => {
  const url = `https://practical-shaw-309fe4.netlify.app/api/weather/${woeid}`;

  return axios
    .get(url, {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    })
    .catch((error) => console.error(error));
};

export const fetchWeatherForecast = (woeid, fn1, fn2 = () => {}) => {
  getWeatherForecast(woeid).then((data) => {
    const forecast = data?.data['consolidated_weather'];

    fn1(forecast);
    return fn2();
  });
};

// search for city
export const searchCity = (query) => {
  const url = `https://practical-shaw-309fe4.netlify.app/api/search/${query}`;

  return axios
    .post(url, {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    })
    .catch((error) => console.error(error));
};
