import { ForecastWeatherData } from "../Api";
import "../App.css";

interface Props {
  forecastWeather: ForecastWeatherData | null;
}

export function NextDayForecast(props: Props) {
  const { forecastWeather } = props;

  const nextDayForecast = forecastWeather?.forecast[1];

  console.log(nextDayForecast);

  return (
    <div className="flex justify-between">
      {nextDayForecast?.weather.map((entry) => (
        <div className="flex" key={entry.time}>
          <h1 className="mr-2">{entry.time}</h1>
          <h1>{entry.temp}</h1>
        </div>
      ))}
      <h1>{nextDayForecast?.date}</h1>
    </div>
  );
}
