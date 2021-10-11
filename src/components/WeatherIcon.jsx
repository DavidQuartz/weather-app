import { showIcon } from '../helper/showIcon';

const WeatherIcon = ({ weather }) => {
  return <img src={showIcon(weather)} alt={weather} />;
};

export default WeatherIcon;
