import { useContext } from 'react';
import { Button } from '@material-ui/core';
import { WeatherContext } from '../context/WeatherContext';
import * as Actions from '../context/actions/weatherActions';

const ShowError = () => {
  const { weatherState, dispatch } = useContext(WeatherContext);

  const { error } = weatherState;

  const clearError = () => {
    dispatch({ type: Actions.CLEAR_ERROR });
  };

  return (
    <div
      id="toast"
      className={`text-center flex items-center text-white bg-red-100 text-red-800 ${
        error ? 'show' : ''
      }`}
    >
      <span>{error}</span>{' '}
      <Button className="min-w-0" onClick={clearError}>
        <span className="material-icons text-red-800">close</span>
      </Button>
    </div>
  );
};

export default ShowError;
