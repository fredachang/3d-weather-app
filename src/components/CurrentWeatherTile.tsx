import { CurrentWeatherData } from "../Api";
import "../App.css";

interface Props {
  currentWeather: CurrentWeatherData | null;
}

export function WeatherTile(props: Props) {
  const { currentWeather } = props;
  return (
    <div className="card">
      <h2>{currentWeather?.date}</h2>
      <h2>{currentWeather?.name}</h2>
      <h2>{currentWeather?.country}</h2>
      <h3>Temp: {currentWeather?.temp} Degrees</h3>
      <h3>Temp Min: {currentWeather?.tempMin}</h3>
      <h3>Temp Max: {currentWeather?.tempMax}</h3>
      <h3>Humidity: {currentWeather?.humidity}</h3>
      <h3>Condition: {currentWeather?.condition}</h3>
      <h3>Description: {currentWeather?.description}</h3>

      <h3>Wind Speed: {currentWeather?.windSpeed}</h3>
      <h3>Sunrise: {currentWeather?.sunrise}</h3>
      <h3>Sunset: {currentWeather?.sunset}</h3>
    </div>
  );
}
