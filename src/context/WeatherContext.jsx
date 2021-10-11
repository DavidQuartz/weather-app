import { createContext, useReducer, useEffect } from 'react';
import weatherReducer from './reducers/weatherReducer';
import * as Actions from './actions/weatherActions';

export const WeatherContext = createContext(null);

const WeatherContextProvider = (props) => {
  const [weatherState, dispatch] = useReducer(weatherReducer, {
    unit: 'C',
    lattitude: null,
    longitude: null,
    city: '',
    woeid: null,
    loading: true,
    error: false,
    success: false,
    id: null,
    forecast: [],
    currentLocationWoeid: '',
  });

  // handling Location coordinates Web API errors
  const handleErrors = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        dispatch({
          type: Actions.SET_ERROR,
          error:
            'Geolocation request denied. Allow location sharing to continue using the weather app.',
        });
        break;
      case error.POSITION_UNAVAILABLE:
        dispatch({
          type: Actions.SET_ERROR,
          error: 'Location information is unavailable.',
        });
        break;
      case error.TIMEOUT:
        dispatch({
          type: Actions.SET_ERROR,
          error: 'The request to get user location timed out.',
        });
        break;
      case error.UNKNOWN_ERROR:
        dispatch({
          type: Actions.SET_ERROR,
          error: 'An unknown error occurred.',
        });
        break;
      default:
        dispatch({
          type: Actions.SET_ERROR,
          error: 'An unknown error occurred.',
        });
    }
  };

  // get device coordinates to query weather api with
  const getCoordinates = (position) => {
    dispatch({
      type: Actions.SET_COORDINATES,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  // wait 4 seconds before beginning query for user location
  const setUserCoordinates = () =>
    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordinates, handleErrors, {
          enableHighAccuracy: true,
        });
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    }, 4000);

  useEffect(() => {
    setUserCoordinates();
    // eslint-disable-next-line
  }, []);

  return (
    <WeatherContext.Provider value={{ weatherState, dispatch }}>
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
