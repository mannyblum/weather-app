export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type ForecastDay = {
  dt: number;
  temp: {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
  };
  weather: Weather[];
};

export type CurrentWeatherResponse = {
  coord: { lat: number; lon: number };
  dt: number;
  weather: Weather[];
  base: 'main';
  wind: {
    speed: number;
    deg: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
};

export type ForecastResponse = {
  list: ForecastDay[];
  city: {
    timezone: number;
  };
};
