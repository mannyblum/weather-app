import { useEffect, useState } from "react";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { APIProvider } from "@vis.gl/react-google-maps";
import { isEmpty } from "lodash-es";
import { PiSpinnerBallBold } from "react-icons/pi";

import { useWeather } from "../context/WeatherContext";
import type {
  CurrentWeatherResponse,
  ForecastResponse,
} from "../types/Weather";

import PlacesSearchInput from "./PlacesSearchInput";
import CurrentWeatherCard from "./CurrentWeatherCard";
import ForecastWeatherCard from "./ForecastWeatherCard";

const count = 7;
const units = "imperial";

interface FetchError extends Error {
  name: string;
  status: number;
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const WeatherAppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 0px auto;
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  border: 0 solid;
  text-align: left;

  font-family:
    "Archivo Narrow", system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }
`;

const LoadingIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  & > svg {
    width: 64px;
    height: 64px;
    animation: ${spin} 3s linear infinite;
  }
`;

const startMessage = css`
  border: 2px solid black;
  border-radius: 4px;
  margin: 12px 24px;
  padding: 12px;

  & > p {
    margin-bottom: 0;
    margin-top: 0;
  }
`;

const weatherApiKey = import.meta.env.VITE_OWM_API_KEY;

const fetchWeather = async (
  location: google.maps.LatLng,
): Promise<CurrentWeatherResponse> => {
  const { lat, lng } = location as google.maps.LatLng;
  await new Promise((resolve) => setTimeout(resolve, 500));

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${units}&appid=${weatherApiKey}`,
  );

  if (!response.ok) {
    const error = new Error("Error Fetching Weather Data");
    (error as FetchError).status = response.status;

    throw error;
  }

  return await response.json();
};

const featchForecast = async (
  location: google.maps.LatLng,
): Promise<ForecastResponse> => {
  const { lat, lng } = location as google.maps.LatLng;
  await new Promise((resolve) => setTimeout(resolve, 500));

  const response = await fetch(
    ` https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&cnt=${count}&units=${units}&appid=${weatherApiKey}`,
  );

  if (!response.ok) {
    const error = new Error("Error Fetching Forecast Data");
    (error as FetchError).status = response.status;

    throw error;
  }

  return await response.json();
};

function weatherQueryOptions(location: google.maps.LatLng | null) {
  return queryOptions({
    queryKey: ["weather", location],
    queryFn: () => {
      if (!location) return Promise.resolve(null);

      return fetchWeather(location);
    },
    enabled: false,
    staleTime: 1000 * 60 * 5,
    throwOnError: true,
  });
}

function forecastQueryOptions(location: google.maps.LatLng | null) {
  return queryOptions({
    queryKey: ["forecast", location],
    queryFn: () => {
      if (!location) return Promise.resolve(null);

      return featchForecast(location);
    },
    enabled: false,
    staleTime: 1000 * 60 * 5,
    throwOnError: true,
  });
}

export interface PlaceRedux extends google.maps.Place {
  displayName: string;
  formattedAddress: string;
}

export default function WeatherApp() {
  const [location, setLocation] = useState<google.maps.LatLng | null>(null);
  const [locationName, setLocationName] = useState<string>("");

  const { weatherState, setWeatherState } = useWeather();

  const handlePlaceSelect = (place: PlaceRedux) => {
    if (place?.location) {
      setLocation(place.location as google.maps.LatLng);
    }

    if (place?.formattedAddress) {
      setLocationName(place.formattedAddress);
      setWeatherState((prev) => ({
        ...prev,
        searchTerm: place.formattedAddress,
      }));
    }
  };

  useEffect(() => {
    if (weatherState.searchTerm) {
      setLocationName(weatherState.searchTerm);
    }
  }, [weatherState.searchTerm]);

  const weather = useQuery(weatherQueryOptions(location));
  const forecast = useQuery(forecastQueryOptions(location));

  useEffect(() => {
    if (weather.data) {
      setWeatherState((prev) => ({
        ...prev,
        currentWeather: weather.data,
      }));
    }
  }, [weather.data]);

  useEffect(() => {
    if (forecast.data) {
      setWeatherState((prev) => ({
        ...prev,
        forecastWeather: forecast.data,
      }));
    }
  }, [forecast.data]);

  useEffect(() => {
    if (location) {
      weather.refetch();
      forecast.refetch();
    }
  }, [location]);

  if (weather.isFetching && !weather.data) {
    return (
      <LoadingIcon>
        <PiSpinnerBallBold />
      </LoadingIcon>
    );
  }

  return (
    <APIProvider
      version="beta"
      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
    >
      <WeatherAppWrapper>
        <PlacesSearchInput onPlaceSelect={handlePlaceSelect} />
        {!isEmpty(weatherState.currentWeather) &&
        weatherState.currentWeather !== null ? (
          <CurrentWeatherCard
            weather={weatherState.currentWeather}
            locationName={locationName}
          />
        ) : (
          <div css={startMessage}>
            <p>Please use the search above to fetch weather data.</p>
          </div>
        )}
        {weatherState.forecastWeather !== null &&
          weatherState.forecastWeather !== undefined && (
            <ForecastWeatherCard forecast={weatherState.forecastWeather} />
          )}
      </WeatherAppWrapper>
    </APIProvider>
  );
}
