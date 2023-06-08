import { ForecastWeatherData } from "../Api";
import "../App.css";

interface Props {
  forecastWeather: ForecastWeatherData | null;
}

export function DailyForecastTile(props: Props) {
  const { forecastWeather } = props;
  return (
    <div className="card">
      <h3>{forecastWeather?.name}</h3>
      <h3>
        {forecastWeather?.forecast.map((day) => {
          return (
            <div key={day.date}>
              <h3>{day.date}</h3>
              <h3>
                {day.weather.map((entry) => {
                  return (
                    <div key={entry.dt}>
                      <h3>Time: {entry.time}</h3>
                      <h3> Temp: {entry.temp} degrees</h3>
                    </div>
                  );
                })}
              </h3>
            </div>
          );
        })}
      </h3>
    </div>
  );
}
