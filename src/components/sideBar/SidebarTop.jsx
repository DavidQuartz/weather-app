import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { WeatherContext } from '../../context/WeatherContext';
import * as Actions from '../../context/actions/appActions';
import * as WeatherActions from '../../context/actions/weatherActions';
import { fetchWeatherForecast } from '../../api/weatherService';

const SidebarTop = () => {
  const { dispatch } = useContext(AppContext);
  const { weatherState, dispatch: weatherDispatch } =
    useContext(WeatherContext);

  const { currentLocationWoeid } = weatherState;

  const openDrawer = () => {
    dispatch({ type: Actions.OPEN_SEARCH_DRAWER });
  };

  const setToCurrentLocation = () => {
    if (currentLocationWoeid) {
      weatherDispatch({ type: WeatherActions.FETCHING });
      // get forecast
      fetchWeatherForecast(currentLocationWoeid, (forecast) =>
        weatherDispatch({
          type: WeatherActions.SET_FORECAST,
          forecast,
        })
      );
    }
  };

  return (
    <div className="sidebar-menu flex items-center justify-between">
      <button onClick={openDrawer} className="btn btn-gray">
        Search for places
      </button>
      <button onClick={setToCurrentLocation} className="location-icon-wrapper">
        <span className="material-icons">my_location</span>
      </button>
    </div>
  );
};

export default SidebarTop;
