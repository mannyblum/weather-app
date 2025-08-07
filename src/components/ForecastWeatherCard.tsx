/** @jsxImportSource @emotion/react */

import type { ForecastDay, ForecastResponse } from "../types/Weather";
import { css } from "@emotion/react";
import { isEmpty } from "lodash-es";

import ForecastDayCard from "./ForecastDayCard";

const forecastCard = css`
  margin: 12px 24px;
  overflow: auto;
`;

const forecastDaysList = css`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

export default function ForecastWeatherCard({
  forecast,
}: {
  forecast: ForecastResponse;
}) {
  if (isEmpty(forecast)) return;

  return (
    <div css={forecastCard}>
      <div css={forecastDaysList}>
        {forecast.list.map((dayForecast: ForecastDay) => {
          return (
            <ForecastDayCard
              timezoneOffset={forecast.city.timezone}
              dayForecast={dayForecast}
              key={dayForecast.dt}
            />
          );
        })}
      </div>
    </div>
  );
}
