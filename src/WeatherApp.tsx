import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { persistQueryClient } from "@tanstack/query-persist-client-core";

import "./index.css";

import WeatherProvider from "./context/WeatherContext.tsx";
import WeatherApp from "./components/WeatherApp.tsx";

const queryClient = new QueryClient();

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 60, // 1 hour
});

export default function Weather() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherProvider>
        <WeatherApp />
      </WeatherProvider>
    </QueryClientProvider>
  );
}
