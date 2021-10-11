import { useState, useContext, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { searchCity, fetchWeatherForecast } from '../../api/weatherService';
import { WeatherContext } from '../../context/WeatherContext';
import * as Actions from '../../context/actions/weatherActions';

const LocationSearchPanel = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const [cities, setCities] = useState([]);

  const { dispatch } = useContext(WeatherContext);

  const handleChange = (event) => {
    const { value } = event.target;

    setSearch(value);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (!search) {
      return;
    }

    setLoading(true);
    searchCity(search).then((data) => {
      const response = data.data;
      setCities(response);
      // dispatch({
      //   type: Actions.SET_CITY,
      //   city: response.title,
      //   woeid: response.woeid,
      // });
      setLoading(false);
    });

    setSearch('');
  };

  const getSelectedCityForecast = (woeid) => {
    dispatch({ type: Actions.FETCHING });
    // get forecast
    fetchWeatherForecast(woeid, (forecast) =>
      dispatch({
        type: Actions.SET_FORECAST,
        forecast,
      })
    );
  };

  // clear search when unounted
  useEffect(() => {
    return () => {
      setSearch('');
      setLoading(false);
      setCities([]);
    };
  }, []);

  return (
    <div className="w-full h-full text-white px-10">
      <form
        onSubmit={handleSearch}
        className="search flex w-full justify-between"
      >
        <div className="bg-transparent p-4 flex border w-full mr-8">
          <span className="w-auto flex justify-end items-center text-gray-500 p-2">
            <i className="material-icons">search</i>
          </span>
          <input
            onChange={handleChange}
            className="w-full p-2 bg-transparent"
            type="text"
            placeholder="search location"
            value={search}
          />
        </div>
        <button
          type="submit"
          className="search--button text-white pl-4 pr-4 w-56"
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <p className="font-semibold">Search</p>
          )}
        </button>
      </form>
      <div className="suggestions mt-20">
        <ul className="space-y-5">
          {cities.map((city) => (
            <li key={city.woeid}>
              <button onClick={() => getSelectedCityForecast(city.woeid)}>
                {city.title}{' '}
                <span className="material-icons">chevron_right</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LocationSearchPanel;
