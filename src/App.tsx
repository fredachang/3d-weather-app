import { useState } from "react";
import "./App.css";
import { getCurrentWeather, getFiveDayForecast } from "./ApiByCityName";
import { BackgroundEnv } from "./components/BackgroundEnv";
import React from "react";
import { CurrentWeatherData, ForecastWeatherData } from "./Api";
import { Message } from "./components/ErrorMessage";
import { useDetectScreenWidth } from "./hooks/useDetectScreen";

export function App() {
  const [city, setCity] = useState<string>("");
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherData | null>(null);
  const [forecastWeather, setForecastWeather] =
    useState<ForecastWeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { isPortrait } = useDetectScreenWidth();

  console.log(isPortrait);

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
      }, 6000);
    } finally {
      setLoading(false);
      setCity("");
    }
  };

  const handleCloseError = () => {
    setErrorMessage(null);
  };

  return (
    <div className="flex">
      <div className="w-full h-full flex justify-center items-center fixed">
        <BackgroundEnv
          loading={loading}
          currentWeather={currentWeather}
          forecastWeather={forecastWeather}
        />
      </div>

      {errorMessage && (
        <div
          className="flex font-regular w-full h-full absolute justify-center items-center"
          onClick={handleCloseError}
        >
          <Message text={errorMessage} delay={0} duration={0.3} />
        </div>
      )}

      {isPortrait && (
        <div
          className="flex font-regular w-full h-full absolute justify-center items-center"
          onClick={handleCloseError}
        >
          <Message text="Turn Screen Around" delay={5} duration={0.3} />
        </div>
      )}

      <section className="w-full h-10 px-1 md:px-10 pt-0 md:pt-2 fixed flex justify-between items-center">
        <h1 className="md:mr-5 font-bold text-lg md:text-4xl">Weather App</h1>
        <form>
          <input
            onChange={handleChange}
            type="text"
            value={city}
            placeholder="Enter City"
            className="bg-transparent text-black focus:outline-none font-regular text-base md:text-2xl border-b border-black border-b-2"
          />
          <button
            onClick={handleClick}
            disabled={loading}
            className="w-10 h-10 md:w-16 font-regular text-base md:text-2xl ml-2.5 md:ml-2"
          >
            {loading ? "Loading..." : "Go"}
          </button>
        </form>
      </section>
    </div>
  );
}

//current weather api

//https://openweathermap.org/current

// Five day api

// https://openweathermap.org/forecast5

// icon index

// https://openweathermap.org/weather-conditions
