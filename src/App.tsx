import { useState } from "react";
import "./App.css";
import axios from "axios";
import { WeatherTile } from "./components/WeatherTile";

export interface WeatherData {
  city: string;
  temp: number;
  humidity: number;
}

const apiKey = "4241a4d183231e8251b3d87d40684479";

export function App() {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleClick = () => {
    setLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      )
      .then((response) => {
        console.log(response);
        const weatherData: WeatherData = {
          city: response.data.name,
          temp: response.data.main.temp,
          humidity: response.data.main.humidity,
        };
        setWeatherData(weatherData);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setWeatherData(null);
        setError(`An Error has occured: ` + error.response.data.message + `.`);
        setLoading(false);
      });
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
      <div className="flex">
        {weatherData && (
          <WeatherTile
            city={weatherData.city}
            temp={weatherData.temp}
            humidity={weatherData.humidity}
          />
        )}
      </div>
    </div>
  );
}
