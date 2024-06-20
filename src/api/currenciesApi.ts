import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../components/consts";
import { ICurrencyData } from "../interfaces/ICurrenciesData";
import { ICurrencyCode } from "../interfaces/ICurrencyCode";
import { IMajorCurrency } from "../interfaces/IMajorCurrency";
import {
  ICurrencyDynamic,
  ICurrencyDynamicRequest,
} from "../interfaces/ICurrencyDynamic";

export const currenciesApi = createApi({
  reducerPath: "currenciesApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    getCurrenciesToday: builder.query<ICurrencyData[], void>({
      query: () => `currencies`,
    }),
    getCurrenciesCodes: builder.query<ICurrencyCode[], void>({
      query: () => "enum_currencies",
    }),
    getMajorCurrencies: builder.query<IMajorCurrency, string>({
      query: (strCode: string) => `currencies/major/${strCode}`,
    }),
    getCurrenciesDynamic: builder.query<
      ICurrencyDynamic[],
      ICurrencyDynamicRequest
    >({
      query: ({ strCode, startDate, endDate }) =>
        `currencies/dynamic/${strCode}?begin_date=${startDate}&end_date=${endDate}`,
    }),
  }),
});

export const { useGetCurrenciesTodayQuery } = currenciesApi;
export const { useGetCurrenciesCodesQuery } = currenciesApi;
export const { useGetMajorCurrenciesQuery } = currenciesApi;
export const { useGetCurrenciesDynamicQuery } = currenciesApi;
