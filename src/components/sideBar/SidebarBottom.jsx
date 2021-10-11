import { useContext } from 'react';
import moment from 'moment';
import { WeatherContext } from '../../context/WeatherContext';

const SidebarBottom = (props) => {
  const { unit, weather, date } = props;

  const { weatherState } = useContext(WeatherContext);
  const { forecast, city } = weatherState;

  const { the_temp } = !!forecast.length ? forecast[0] : 0;

  const today = moment(date).format('ddd, D MMM');

  return (
    <div className="weather-widget text-center h-full pt-20">
      <div className="mb-10">
        <h1>
          {the_temp ? Math.round(the_temp) : 0}
          <span>
            <sup>o</sup>
            {unit}
          </span>
        </h1>
      </div>
      <h2 className="mb-20">{weather}</h2>
      <div className="weather-widget__bottom space-y-10">
        <div className="flex px-24 justify-center items-center mt-10 space-x-3">
          <p>Today</p>
          <p>&bull;</p>
          <p>
            <time dateTime={date}>{today}</time>
          </p>
        </div>

        {city && (
          <p className="flex items-center justify-center">
            <span className="material-icons mr-3">place</span> {city}
          </p>
        )}
      </div>
    </div>
  );
};

export default SidebarBottom;
