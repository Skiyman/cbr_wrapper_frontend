import { configureStore } from "@reduxjs/toolkit";
import { currenciesApi } from "./currenciesApi";

export const store = configureStore({
  reducer: {
    [currenciesApi.reducerPath]: currenciesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(currenciesApi.middleware),
});
