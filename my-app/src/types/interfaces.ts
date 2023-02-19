export interface Currencies {
  currency: string;
  value: number;
  id: number;
}

export interface CurrenciesState {
  currentCurrencyId: number;
  currenciesRates: Currencies[];
}

export interface ConvertState {
  from: string;
  to: string;
  amount: number;
  rate: number;
  result: number;
}

export interface GlobalState {
  currencies: CurrenciesState;
  convert: ConvertState;
}
