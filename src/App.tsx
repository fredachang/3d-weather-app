import { useState } from "react";
import "./App.css";
import {
  CurrentWeatherData,
  ForecastWeatherData,
  getCoordinates,
  getCurrentWeather,
  getFiveDayForecast,
} from "./Api";
import { BackgroundEnv } from "./components/BackgroundEnv";
import { NextDayForecast } from "./components/NextDayForecast";

export function App() {
  const [city, setCity] = useState<string>("");
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherData | null>(null);

  const [forecastWeather, setForecastWeather] =
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

      const forecastWeather = await getFiveDayForecast(
        coordinates.lat,
        coordinates.lon
      );
      setCurrentWeather(currentWeather);
      setForecastWeather(forecastWeather);
    } finally {
      setLoading(false);
      setCity("");
    }
  };

  return (
    <div className="flex">
      <div className="w-full h-full flex fixed z-0">
        <BackgroundEnv currentWeather={currentWeather} />
      </div>

      {/* <div id="balloon-logo" className="w-20 h-20 flex absolute t-0 l-0 z-50">
        <ThreeLogoCanvas />
      </div> */}

      <main className="w-full z-10">
        <section
          id="top-section"
          className="w-full h-10 pl-20 fixed flex justify-between items-center"
        >
          <div className="flex">
            <h1 className="mr-5">Weather App</h1>
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
          </div>

          <div id="search-result" className="flex">
            {error && <p>{error}</p>}
            <h1 className="mr-5">{currentWeather?.name}</h1>
            <h1 className="mr-5">{currentWeather?.country}</h1>
            <h1 className="mr-5">{currentWeather?.date}</h1>
          </div>
        </section>

        <section
          id="left-panel"
          className="h-full w-10 fixed l-0 py-28 flex flex-col items-center justify-between"
        >
          <div className="w-32 -rotate-90 flex justify-center">
            <h1>Min: {currentWeather?.tempMin}&deg;</h1>
          </div>

          <div className="w-32 -rotate-90 flex justify-center">
            <h1>Max: {currentWeather?.tempMax}&deg;</h1>
          </div>

          <div className="w-36 -rotate-90 flex justify-center">
            <h1>Humidity: {currentWeather?.humidity}</h1>
          </div>

          <div className="w-48 -rotate-90 flex justify-center">
            <h1>Wind Speed: {currentWeather?.windSpeed}</h1>
          </div>
        </section>

        <section id="right-panel" className="w-full h-10 pl-10 fixed bottom-0">
          <NextDayForecast forecastWeather={forecastWeather} />
        </section>
      </main>
    </div>
  );
}

//current weather api

//https://openweathermap.org/current

// Five day api

// https://openweathermap.org/forecast5

// icon index

// https://openweathermap.org/weather-conditions
