/** @jsxImportSource @emotion/react */

import { useDayOrNight } from "../hooks/useDayOrNight";
import type { CurrentWeatherResponse } from "../types/Weather";
import { css } from "@emotion/react";
import { LocationIcon } from "@primer/octicons-react";
import { isEmpty } from "lodash-es";

import "../css/weather-icons-wind.css";
import "../css/weather-icons.css";

const weatherCardWrapper = css`
  margin: 12px 24px;
`;

const weatherCard = css`
  border: 2px solid #333;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  background-color: #f4f6f8;
  margin-bottom: 12px;

  & > div {
    padding: 12px;
  }
`;

const weatherMeta = css`
  display: flex;
  flex-direction: row;
  align-content: stretch;
  gap: 4px;
  width: 100%;

  & > div {
    background-color: #f4f6f8;
    border: 2px solid black;
    border-radius: 4px;
    text-align: center;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const weatherIcon = css`
  font-size: 100px;
  margin-right: 24px;
  flex-grow: 2;
  align-self: center;
  justify-self: center;
`;

const weatherMetaIcon = css`
  font-size: 24px;
  margin: 4px 0;
  flex-grow: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const weatherMetaIconReg = css`
  align-self: center;
  justify-self: center;
`;

const weatherMetaIconWind = css`
  font-size: 36px;
  align-self: center;
  justify-self: center;
`;

const info = css`
  font-size: 1.3rem;
  line-height: 1.2;

  & h3 {
    color: oklch(55.4% 0.046 257.417);
    font-size: 0.9rem;
  }
`;

const city = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  & svg {
    color: oklch(55.4% 0.046 257.417);
  }
`;

const temp = css`
  font-size: 48px;
`;

const description = css`
  font-size: 0.8rem;
`;

type CurrentWeatherCardProps = {
  locationName?: string;
  weather: CurrentWeatherResponse;
};
export default function CurrentWeatherCard({
  weather,
  locationName,
}: CurrentWeatherCardProps) {
  const timeOfDay = useDayOrNight(weather.dt);

  if (isEmpty(weather)) return;

  return (
    <div css={weatherCardWrapper}>
      <div css={weatherCard}>
        <div>
          <div css={info}>
            <h2>Current</h2>
            <div css={city}>
              <LocationIcon size={16} />
              {locationName && <h3>{locationName}</h3>}
            </div>
          </div>
          <span css={temp}>{Math.round(weather.main.temp)}&deg;f</span>
          <span css={description}>
            {weather.weather[0].description.replace(/\b\w/g, (c) =>
              c.toUpperCase()
            )}
          </span>
        </div>
        <div>
          <i
            className={`wi wi-owm-${timeOfDay}-${weather.weather[0].id}`}
            css={weatherIcon}
          ></i>
        </div>
      </div>
      <div css={weatherMeta}>
        <div>
          <h3>Feels Like</h3>
          <div css={weatherMetaIcon}>
            <i className={`wi wi-thermometer`} css={weatherMetaIconReg}></i>
          </div>
          <span>{Math.round(weather.main.feels_like)}&deg;F</span>
        </div>
        <div>
          <h3>Humidity</h3>
          <div css={weatherMetaIcon}>
            <i className={`wi wi-humidity`} css={weatherMetaIconReg}></i>
          </div>
          <span>{Math.round(weather.main.humidity)}%</span>
        </div>
        <div>
          <h3>Wind</h3>
          <div css={weatherMetaIcon}>
            <i
              className={`wi wi-wind from-${weather.wind.deg}-deg`}
              css={weatherMetaIconWind}
            ></i>
          </div>
          <span>{Math.round(weather.wind.speed)} mph</span>
        </div>
      </div>
    </div>
  );
}
