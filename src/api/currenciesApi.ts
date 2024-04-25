import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../components/consts";
import { ICurrencyData } from "../interfaces/ICurrenciesData";
import { ICurrencyCode } from "../interfaces/ICurrencyCode";

export const currenciesApi = createApi({
  reducerPath: "currenciesApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    getCurrenciesToday: builder.query<ICurrencyData[], void>({
      query: () => `currencies/`,
    }),
    getCurrenciesCodes: builder.query<ICurrencyCode[], void>({
      query: () => "enum_currencies/",
    }),
  }),
});

export const { useGetCurrenciesTodayQuery } = currenciesApi;
export const { useGetCurrenciesCodesQuery } = currenciesApi;
