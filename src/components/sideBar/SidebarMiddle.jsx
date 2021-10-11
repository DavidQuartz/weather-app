import WeatherIcon from '../WeatherIcon';

const SidebarMiddle = ({ weather }) => {
  return (
    <div className="sidebar-weather-display">
      <div className="h-full w-full sidebar-weather-display__background" />
      <div>
        <WeatherIcon weather={weather} />
      </div>
    </div>
  );
};

export default SidebarMiddle;
