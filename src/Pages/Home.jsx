import { useContext, useEffect } from 'react';
import * as Actions from '../context/actions/weatherActions';
import { WeatherContext } from '../context/WeatherContext';
import Dashboard from '../components/main/Dashboard';
import SideBar from '../components/sideBar/SideBar';
import ShowError from '../components/ShowError';
import { getLocationID, fetchWeatherForecast } from '../api/weatherService';

const Home = () => {
  const { weatherState, dispatch } = useContext(WeatherContext);

  const { longitude, latitude } = weatherState;

  // get user's location woeid and then get the forecast for that woeid
  const getWoeid = (lat, long) => {
    return getLocationID(lat, long)
      .then((data) => {
        const response = data.data[0];
        dispatch({
          type: Actions.SET_CITY,
          city: response.title,
          woeid: response.woeid,
        });
        // get forecast
        fetchWeatherForecast(
          response.woeid,
          (forecast) =>
            dispatch({
              type: Actions.SET_FORECAST,
              forecast,
            }),
          () =>
            dispatch({
              type: Actions.SET_CURRENT_LOCATION,
              woeid: response.woeid,
            })
        );
      })
      .catch((error) => {
        return dispatch({ type: Actions.SET_ERROR, error: error.message });
      });
  };

  useEffect(() => {
    if (longitude && latitude) {
      getWoeid(latitude, longitude);
    }
    //eslint-disable-next-line
  }, [longitude, latitude, dispatch]);

  return (
    <>
      <ShowError />
      <div className="flex relative w-full flex-wrap">
        <SideBar />
        <Dashboard />
      </div>
    </>
  );
};

export default Home;
