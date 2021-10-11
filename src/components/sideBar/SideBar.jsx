import { useContext, useState, useEffect } from 'react';
import { Drawer, Button } from '@material-ui/core';
import { AppContext } from '../../context/AppContext';
import { WeatherContext } from '../../context/WeatherContext';
import SidebarBottom from './SidebarBottom';
import SidebarMiddle from './SidebarMiddle';
import SidebarTop from './SidebarTop';
import * as Actions from '../../context/actions/appActions.js';
import LocationSearchPanel from './LocationSearchPanel';

const SideBar = () => {
  const { appState, dispatch } = useContext(AppContext);
  const { weatherState } = useContext(WeatherContext);

  const { forecast, unit } = weatherState;

  const [weatherForecast, setWeatherForecast] = useState({
    the_temp: 0,
    weather_state_name: '',
    applicable_date: new Date(),
  });

  const { the_temp, weather_state_name, applicable_date } = weatherForecast;

  const { openSearchDrawer } = appState;

  useEffect(() => {
    if (!!forecast.length) {
      const {
        the_temp: t,
        weather_state_name: ws,
        applicable_date: ad,
      } = forecast[0];
      setWeatherForecast({
        the_temp: t,
        weather_state_name: ws,
        applicable_date: ad,
      });
    }
  }, [forecast]);

  const closeDrawer = () => {
    dispatch({ type: Actions.CLOSE_SEARCH_DRAWER });
  };

  return (
    <div className="sidebar-wrapper">
      <Drawer
        anchor="left"
        variant="persistent"
        open={openSearchDrawer}
        classes={{ paper: 'h-full search-drawer p-5 w-full' }}
      >
        <div className="flex justify-end items-center mb-10">
          <Button className="min-w-0" onClick={closeDrawer}>
            <span className="material-icons text-white">close</span>
          </Button>
        </div>
        <LocationSearchPanel />
      </Drawer>

      <div className="sidebar-wrapper__blocks flex-column h-full w-full sidebar">
        <SidebarTop />
        <SidebarMiddle weather={weather_state_name} />
        <SidebarBottom
          date={applicable_date}
          temp={the_temp}
          unit={unit}
          weather={weather_state_name}
        />
      </div>
    </div>
  );
};

export default SideBar;
