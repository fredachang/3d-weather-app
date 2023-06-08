import axios from "axios";
import { format, parseISO } from "date-fns";

export const apiKeyOne = "50a87e24382939f7af2e8bb8a452c9ee";

export const apiKeyTwo = "4241a4d183231e8251b3d87d40684479";

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface CurrentWeatherData {
  date: string;
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

export interface ForecastByThreeHour {
  dt: number;
  dateTimeText: string;
  condition: string;
  description: string;
  temp: number;
}

export interface ForecastByDate {
  date: string;
  weather: TempEveryThreeHours[];
}

type TempEveryThreeHours = {
  dt: number;
  time: string;
  temp: number;
  condition: string;
  description: string;
};

export interface ForecastWeatherData {
  name: string;
  country: string;
  forecast: ForecastByDate[];
}

export const convertToHourMinute = (timecode: number) => {
  const date = new Date(timecode * 1000);
  const time = format(date, "HH:mm");
  return time;
};

export const convertToDate = (timecode: number) => {
  const date = new Date(timecode * 1000);
  const time = format(date, "yyyy-MM-dd");
  return time;
};

const toThreeHourForecast = (timeslot: any): ForecastByThreeHour => {
  return {
    dt: timeslot.dt,
    condition: timeslot.weather[0].main,
    dateTimeText: timeslot.dt_txt,
    description: timeslot.weather[0].description,
    temp: timeslot.main.temp,
  };
};

const toForecastByDate = (data: ForecastByThreeHour[]): ForecastByDate[] =>
  Object.entries(
    data.reduce((acc: { [date: string]: TempEveryThreeHours[] }, obj) => {
      const datetime = parseISO(obj.dateTimeText);
      const date = format(datetime, "yyyy-MM-dd");
      const time = format(datetime, "HH:mm");

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push({
        time,
        dt: obj.dt,
        temp: obj.temp,
        condition: obj.condition,
        description: obj.description,
      });
      return acc;
    }, {})
  ).map(([date, weather]) => ({
    date,
    weather: weather as TempEveryThreeHours[],
  }));

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
  lat: number,
  lon: number
): Promise<ForecastWeatherData> => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKeyOne}&units=metric`
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
