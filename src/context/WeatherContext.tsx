import type {
  CurrentWeatherResponse,
  ForecastResponse,
} from "../types/Weather";
import { createContext, useContext, useEffect, useState } from "react";

import type { ReactNode } from "react";

export interface WeatherContextType {
  weatherState: WeatherState;
  setWeatherState: React.Dispatch<React.SetStateAction<WeatherState>>;
}

interface WeatherState {
  searchTerm: string | null;
  currentWeather: CurrentWeatherResponse | null;
  forecastWeather: ForecastResponse | null;
}

const defaultState: WeatherState = {
  searchTerm: null,
  currentWeather: null,
  forecastWeather: null,
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weatherState, setWeatherState] = useState<WeatherState>(() => {
    const stored = sessionStorage.getItem("weatherState");
    return stored ? JSON.parse(stored) : defaultState;
  });

  useEffect(() => {
    sessionStorage.setItem("weatherState", JSON.stringify(weatherState));
  }, [weatherState]);

  return (
    <WeatherContext.Provider
      value={{
        weatherState,
        setWeatherState,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);

  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }

  return context;
};

export default WeatherProvider;
