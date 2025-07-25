// ✅ 1. Core Features
// [ j Search
//  [x] Input field for searching weather by city name
//  [x] Submit button or search-on-type (with debounce)
//  [ ] Show validation or error for invalid city input
//  [ ] Optional: Use current geolocation for weather
//
// [x] Current Weather Display
//  [x] City name and country
//  [x] Temperature (Celsius and/or Fahrenheit)
//  [x] Weather description (e.g. “light rain”)
//  [x] Weather icon (from API)
//  [x] Feels like temperature
//  [x] Humidity
//  [x] Wind speed
//
// [ ] API Integration
//  [x] Use a weather API (e.g. OpenWeatherMap)
//  [x] Handle loading state
//  [ ] Handle error state (e.g. "City not found")
//
// ⚙️ 2. State & Data Management
// [ ] Store:
//  [x] Search query
//  [x] Weather data response
//  [ ] Loading/error states
// [x] Use React's useState, useEffect
// [x] Optional: useContext or useReducer for more complex data flows
//
// 🎨 3. UI/UX
// [ ] Responsive design (mobile-first layout)
// [ ] Clean and modern UI
// [x] Weather icons match condition (e.g. sun, rain, snow)
// [ ] Dynamic background or styling based on weather (optional)
// [ ] Temperature toggle (°C / °F)
//
// 🧪 4. Optional Features to Elevate the App
// [x] Forecast
//  [x] 5-day or 7-day forecast
//  [ ] Show daily high/low temps and weather icons
//
// [ ] Location Detection
//  [ ] Use browser geolocation to show weather for current location
//
// [ ] Search History
//  [ ] Show recent searches
//  [ ] Allow users to click a past search to load its weather
//
// [ ] Theme Toggle
//  [ ] Light/dark mode toggle
//
// [ ] Error Handling & Edge Case
//  [ ] No internet / API down
//  [ ] Empty input
//  [ ] Nonexistent cities

const Weather = () => {
  return (
    <div>
      Weather
      {/* <WeatherProvider>
              <WeatherApp />
            </WeatherProvider> */}
    </div>
  );
};

export default Weather;
