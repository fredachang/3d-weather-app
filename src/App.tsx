import { useState } from "react";
import "./App.css";
import { WeatherTile } from "./components/WeatherTile";
import {
  CurrentWeatherData,
  ForecastWeatherData,
  getCoordinates,
  getCurrentWeather,
  getFiveDayForecast,
} from "./Api";

export function App() {
  const [city, setCity] = useState<string>("");
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherData | null>(null);

  const [threeHourForecast, setThreeHourForecast] =
    useState<ForecastWeatherData | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const coordinates = await getCoordinates(city);
      const currentWeather = await getCurrentWeather(
        coordinates.lat,
        coordinates.lon
      );

      const threeHourForecast = await getFiveDayForecast(
        coordinates.lat,
        coordinates.lon
      );
      setCurrentWeather(currentWeather);
      setThreeHourForecast(threeHourForecast);
    } catch (error) {
      setError("Error fetching weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form>
        <input
          onChange={handleChange}
          type="text"
          value={city}
          placeholder="Enter City"
        />
        <button onClick={handleClick} disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </form>
      {error && <p>{error}</p>}

      <h2>Current Weather</h2>

      <div>{currentWeather?.condition}</div>
      <div>{currentWeather?.name}</div>
      <div>{currentWeather?.country}</div>
      <div>Temp: {currentWeather?.temp}</div>
      <div>Min: {currentWeather?.tempMin}</div>
      <div>Max: {currentWeather?.tempMax}</div>
      <div>Humidity: {currentWeather?.humidity}</div>
      <div>Sunrise: {currentWeather?.sunrise}</div>
      <div>Sunset: {currentWeather?.sunset}</div>

      <h2>3 Hour/5Day Forecast</h2>
      <div>{threeHourForecast?.name}</div>
      {threeHourForecast?.forecast.map((day: any) => (
        <p key={day.dt}>
          <span>{day.dateTimeText}:</span>
          {day.temp}
        </p>
      ))}
    </div>
  );
}

//current weather api

//https://openweathermap.org/current

// Five day api

// https://openweathermap.org/forecast5

// icon index

// https://openweathermap.org/weather-conditions
