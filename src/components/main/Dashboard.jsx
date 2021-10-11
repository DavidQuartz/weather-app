import { useContext, useState, useEffect } from 'react';
import { WeatherContext } from '../../context/WeatherContext';
import Footer from '../Footer';
import HighlightCard from '../HighlightCard';
import LoadingCard from '../Loader/ContentLoader';
import TemperatureCard from '../TemperatureCard';
import TemperatureButton from './TemperatureButton';

const MainView = () => {
  const { weatherState } = useContext(WeatherContext);

  const { forecast, unit, loading } = weatherState;

  const [weatherForecast, setWeatherForecast] = useState({
    visibility: '',
    humidity: '',
    air_pressure: '',
    wind_speed: '',
    wind_direction_compass: '',
  });

  const {
    visibility,
    humidity,
    air_pressure,
    wind_speed,
    wind_direction_compass,
  } = weatherForecast;

  useEffect(() => {
    if (!!forecast.length) {
      const {
        visibility: v,
        humidity: h,
        air_pressure: ap,
        wind_speed: ws,
        wind_direction_compass: wd,
      } = forecast[0];
      setWeatherForecast({
        visibility: v,
        humidity: h,
        air_pressure: ap,
        wind_speed: ws,
        wind_direction_compass: wd,
      });
    }
  }, [forecast]);

  return (
    <div className="dashboard">
      <div className="unit justify-end items-center w-full">
        <TemperatureButton spacing="mr-4" unit="C" />
        <TemperatureButton unit="F" />
      </div>
      <div className="temperature-container w-full my-10">
        <div className="temperature-container__cards">
          {loading
            ? [1, 2, 3, 4, 5].map((el) => <LoadingCard key={el} />)
            : forecast
                .slice(1)
                .map((f) => (
                  <TemperatureCard key={f.id} data={f} unit={unit} />
                ))}
        </div>
      </div>
      <div className="highlights space-y-10 mt-5">
        <h1>Today's HIghlights</h1>
        <div className="highlight">
          <HighlightCard
            title="Wind Status"
            stat={wind_speed ? Math.round(wind_speed) : 0}
            unit="mph"
            direction={wind_direction_compass}
          />
          <HighlightCard
            title="Humidity"
            stat={humidity ? Math.round(humidity) : 0}
            unit="%"
          />
          <HighlightCard
            title="Visibility"
            stat={visibility ? visibility.toFixed(1).replace('.', ',') : 0}
            unit="miles"
          />
          <HighlightCard
            title="Air Pressure"
            stat={air_pressure ? Math.round(air_pressure) : 0}
            unit="mb"
          />
        </div>
      </div>
      <div className="w-full relative">
        <Footer />
      </div>
    </div>
  );
};

export default MainView;
