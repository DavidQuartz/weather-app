import * as Actions from '../actions/weatherActions';

const weatherReducer = (state, action) => {
  switch (action.type) {
    case Actions.FETCHING:
      return {
        ...state,
        loading: true,
      };

    case Actions.SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocationWoeid: action.woeid,
      };

    case Actions.SET_COORDINATES:
      return {
        ...state,
        longitude: action.longitude,
        latitude: action.latitude,
      };

    case Actions.SET_CITY:
      return {
        ...state,
        city: action.city,
        woeid: action.woeid,
      };

    case Actions.SET_FORECAST:
      // console.log('payload', action);

      return {
        ...state,
        loading: false,
        forecast: action.forecast,
      };

    case Actions.SET_FAHRENHEIT_UNIT: {
      let newForcast = [];

      if (!!state.forecast.length)
        for (let i = 0; i < state.forecast.length; i++) {
          state.forecast[i].max_temp =
            (state.forecast[i].max_temp * 9) / 5 + 32;
          state.forecast[i].min_temp =
            (state.forecast[i].min_temp * 9) / 5 + 32;
          state.forecast[i].the_temp =
            (state.forecast[i].the_temp * 9) / 5 + 32;

          newForcast.push(state.forecast[i]);
        }

      return {
        ...state,
        forecast: newForcast,
        unit: action.unit,
      };
    }
    case Actions.SET_CELCIUS_UNIT:
      // ((1 − 32) × 5/9) / -17.22
      let newForcast = [];
      if (!!state.forecast.length)
        for (let i = 0; i < state.forecast.length; i++) {
          state.forecast[i].max_temp =
            (state.forecast[i].max_temp - 32) * (5 / 9);
          state.forecast[i].min_temp =
            (state.forecast[i].min_temp - 32) * (5 / 9);
          state.forecast[i].the_temp =
            (state.forecast[i].the_temp - 32) * (5 / 9);

          newForcast.push(state.forecast[i]);
        }

      return {
        ...state,
        forecast: newForcast,
        unit: action.unit,
      };

    case Actions.SET_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case Actions.CLEAR_ERROR:
      return {
        ...state,
        error: false,
      };

    default:
      return state;
  }
};

export default weatherReducer;
