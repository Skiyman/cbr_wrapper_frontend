export interface IShortCurrency {
  date: string;
  course: number;
  is_more: number;
}

export interface IMajorCurrency {
  name: string;
  course: number;
  is_more: number;
  previous_days: [IShortCurrency];
}
