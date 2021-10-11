import { useContext } from 'react';
import { WeatherContext } from '../../context/WeatherContext';
import * as Actions from '../../context/actions/weatherActions';

const TemperatureButton = ({ spacing, unit }) => {
  const { weatherState, dispatch } = useContext(WeatherContext);

  const { unit: tempUnit } = weatherState;

  const setUnit = (e) => {
    if (unit === 'F' && tempUnit === 'C') {
      dispatch({ type: Actions.SET_FAHRENHEIT_UNIT, unit });
    } else if (unit === 'C' && tempUnit === 'F') {
      dispatch({ type: Actions.SET_CELCIUS_UNIT, unit });
    }
  };

  return (
    <button
      onClick={setUnit}
      className={`icon-wrapper ${spacing} ${tempUnit === unit ? 'active' : ''}`}
    >
      <span>
        <sup>o</sup>
        {unit}
      </span>
    </button>
  );
};

export default TemperatureButton;
