import moment from 'moment';
import WeatherIcon from './WeatherIcon';

const TemperatureCard = (props) => {
  const { data, unit } = props;

  const {
    weather_state_name: weather,
    max_temp,
    min_temp,
    applicable_date,
  } = data;

  let day = moment(applicable_date).format('ddd, D MMM');
  const currentDay = moment(new Date()).format('D');
  const tomorrow = parseInt(currentDay) + 1;
  const propDay = moment(applicable_date).format('D');

  if (parseInt(propDay) === tomorrow) {
    day = 'Tomorrow';
  }

  return (
    <div className="card mb-4 text-center space-y-5">
      <h2 className="day">
        <time dateTime={applicable_date}>{day}</time>
      </h2>
      <div className="flex justify-center">
        <WeatherIcon weather={weather} />
      </div>
      <div className="space-x-10">
        <span>
          {Math.round(min_temp)}
          <sup>o</sup>
          {unit}
        </span>

        <span>
          {Math.round(max_temp)}
          <sup>o</sup>
          {unit}
        </span>
      </div>
    </div>
  );
};

export default TemperatureCard;
