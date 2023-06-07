import axios from "axios";
import { format } from "date-fns";

export const apiKeyOne = "50a87e24382939f7af2e8bb8a452c9ee";

export const apiKeyTwo = "4241a4d183231e8251b3d87d40684479";

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface CurrentWeatherData {
  name: string;
  country: string;
  condition: string;
  description: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  sunrise: string;
  sunset: string;
}

export interface ThreeHourForecast {
  dt: number;
  dateTimeText: string;
  condition: string;
  description: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
}

export interface ForecastWeatherData {
  name: string;
  country: string;
  forecast: object[];
}

export const convertTime = (timecode: number) => {
  const date = new Date(timecode * 1000);
  const time = format(date, "HH:mm");
  return time;
};

const toThreeHourForecast = (day: any): ThreeHourForecast => {
  return {
    dt: day.dt,
    condition: day.weather[0].main,
    dateTimeText: day.dt_txt,
    description: day.weather[0].description,
    temp: day.main.temp,
    tempMin: day.main.temp_min,
    tempMax: day.main.temp_max,
    humidity: day.main.humidity,
    windSpeed: day.wind.speed,
  };
};

export const getCoordinates = async (city: string): Promise<Coordinates> => {
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKeyOne}`
  );

  const coordinates: Coordinates = {
    lat: response.data[0].lat,
    lon: response.data[0].lon,
  };
  return coordinates;
};

export const getCurrentWeather = async (
  lat: number,
  lon: number
): Promise<CurrentWeatherData> => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyOne}&units=metric`
  );
  const currentWeather: CurrentWeatherData = {
    name: response.data.name,
    country: response.data.sys.country,
    condition: response.data.weather[0].main,
    description: response.data.weather[0].description,
    temp: response.data.main.temp,
    tempMin: response.data.main.temp_min,
    tempMax: response.data.main.temp_max,
    humidity: response.data.main.humidity,
    windSpeed: response.data.wind.speed,
    sunrise: convertTime(response.data.sys.sunrise),
    sunset: convertTime(response.data.sys.sunset),
  };
  return currentWeather;
};

export const getFiveDayForecast = async (
  lat: number,
  lon: number
): Promise<ForecastWeatherData> => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKeyOne}&units=metric`
  );

  const threehourForecast: ForecastWeatherData = {
    name: response.data.city.name,
    country: response.data.country,
    forecast: response.data.list.map((day: any) => toThreeHourForecast(day)),
  };
  return threehourForecast;
};
