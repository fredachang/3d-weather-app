import { useState } from "react";
import "./App.css";
import { getCurrentWeather, getFiveDayForecast } from "./ApiByCityName";
import { BackgroundEnv } from "./components/BackgroundEnv";
import React from "react";
import { CurrentWeatherData, ForecastWeatherData } from "./Api";
import { ErrorMessage } from "./components/ErrorMessage";

export function App() {
  const [city, setCity] = useState<string>("");
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherData | null>(null);
  const [forecastWeather, setForecastWeather] =
    useState<ForecastWeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setErrorMessage(null);

      const currentWeather = await getCurrentWeather(city);

      const forecastWeather = await getFiveDayForecast(city);
      setCurrentWeather(currentWeather);
      setForecastWeather(forecastWeather);
    } catch (error: any) {
      if (error.response.status === 404) {
        setErrorMessage("City is Not Found. Please check spelling.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } finally {
      setLoading(false);
      setCity("");
    }
  };

  //old Lat and Lon call

  // const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();

  //   try {
  //     setLoading(true);
  //     setError(null);

  //     const coordinates = await getCoordinates(city);
  //     const currentWeather = await getCurrentWeather(
  //       coordinates.lat,
  //       coordinates.lon
  //     );

  //     const forecastWeather = await getFiveDayForecast(
  //       coordinates.lat,
  //       coordinates.lon
  //     );
  //     setCurrentWeather(currentWeather);
  //     setForecastWeather(forecastWeather);
  //   } finally {
  //     setLoading(false);
  //     setCity("");
  //   }
  // };

  const handleCloseError = () => {
    setErrorMessage(null);
  };

  return (
    <div className="flex">
      <div className="w-full h-full flex justify-center items-center fixed z-0">
        <BackgroundEnv
          loading={loading}
          currentWeather={currentWeather}
          forecastWeather={forecastWeather}
        />
      </div>

      {errorMessage && (
        <div
          className="flex w-full h-full absolute justify-center items-center"
          onClick={handleCloseError}
        >
          <ErrorMessage errorText={errorMessage} />
        </div>
      )}

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
            <h1 className="mr-5">{currentWeather?.name}</h1>
            <h1 className="mr-5">{currentWeather?.country}</h1>
            <h1 className="mr-5">{currentWeather?.date}</h1>
          </div>
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
