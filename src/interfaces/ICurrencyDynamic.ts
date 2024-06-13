export interface ICurrencyDynamic {
  currency_date: string;
  currency_rate: number;
}

export interface ICurrencyDynamicRequest {
  strCode: string;
  startDate: string;
  endDate: string;
}
