import { CurrentWeatherData } from "../Api";
import "../App.css";

interface Props {
  currentWeather: CurrentWeatherData | null;
}

export function WeatherTile(props: Props) {
  const { currentWeather } = props;
  return (
    <div className="current-weather-container">
      <div className="col-1">
        <div>
          <h1>{currentWeather?.name}</h1>
          <h1>{currentWeather?.country}</h1>
        </div>
        <div>
          <h2>{currentWeather?.date}</h2>
        </div>
      </div>

      <div className="col-2">
        <div className="row">
          <h2>
            {currentWeather?.tempMin}&deg;
            <span>Min</span>
          </h2>

          <h2>-</h2>
          <h2>
            {currentWeather?.tempMax}&deg;
            <span>Max</span>
          </h2>
        </div>

        <div className="row">
          <h2>
            {currentWeather?.sunrise}
            <span>Sunrise</span>
          </h2>

          <h2>-</h2>
          <h2>
            {currentWeather?.sunset}
            <span>Sunset</span>
          </h2>
        </div>

        <div className="row">
          <h2>
            {currentWeather?.humidity}
            <span>Humidity</span>
          </h2>

          <h2>-</h2>
          <h2>
            {currentWeather?.windSpeed}
            <span>Wind Speed</span>
          </h2>
        </div>
      </div>

      <div className="col-3">
        <div>
          <h1>{currentWeather?.temp}&deg;</h1>
          <span>currently</span>
        </div>

        <div>
          <h2>{currentWeather?.condition}</h2>
        </div>
      </div>
    </div>
  );
}
