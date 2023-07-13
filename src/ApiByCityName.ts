import axios from "axios";
import {
  CurrentWeatherData,
  ForecastByDate,
  ForecastByThreeHour,
  ForecastWeatherData,
  apiKeyOne,
  convertToDate,
  convertToHourMinute,
  toForecastByDate,
  toThreeHourForecast,
} from "./Api";

export const getCurrentWeather = async (
  cityName: string
): Promise<CurrentWeatherData> => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKeyOne}&units=metric`
  );

  const currentWeather: CurrentWeatherData = {
    name: response.data.name,
    date: convertToDate(response.data.dt),
    country: response.data.sys.country,
    condition: response.data.weather[0].main,
    description: response.data.weather[0].description,
    temp: response.data.main.temp,
    tempMin: response.data.main.temp_min,
    tempMax: response.data.main.temp_max,
    humidity: response.data.main.humidity,
    windSpeed: response.data.wind.speed,
    sunrise: convertToHourMinute(response.data.sys.sunrise),
    sunset: convertToHourMinute(response.data.sys.sunset),
  };
  return currentWeather;
};

export const getFiveDayForecast = async (
  cityName: string
): Promise<ForecastWeatherData> => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKeyOne}&units=metric`
  );

  const threehourForecast: ForecastByThreeHour[] = response.data.list.map(
    (timeslot: any) => toThreeHourForecast(timeslot)
  );

  const dailyForecast: ForecastByDate[] = toForecastByDate(threehourForecast);

  const fiveDayForecast: ForecastWeatherData = {
    name: response.data.city.name,
    country: response.data.country,
    forecast: dailyForecast,
  };
  return fiveDayForecast;
};
