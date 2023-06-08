import { ForecastWeatherData } from "../Api";
import "../App.css";

interface Props {
  forecastWeather: ForecastWeatherData | null;
}

export function DailyForecastTile(props: Props) {
  const { forecastWeather } = props;
  return (
    <div className="forecast-container">
      {forecastWeather?.forecast.map((day) => {
        return (
          <div className="daily-forecast" key={day.date}>
            <h2>{day.date}</h2>
            <h3>
              {day.weather.map((entry) => {
                return (
                  <div key={entry.dt}>
                    <h3>
                      {entry.time} {entry.temp}&deg;
                    </h3>
                  </div>
                );
              })}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
