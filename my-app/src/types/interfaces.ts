import { TFunction } from 'i18next';

export interface Currencies {
  currency: string;
  value: number;
}

export interface CurrenciesState {
  currentCurrency: string;
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

export interface AutocompleteHandler {
  (event: React.ChangeEvent<unknown>, currency: string): void;
}

export interface PageHandler {
  (event: React.ChangeEvent<unknown>, page: number): void;
}

export interface BuildOutput {
  (translation: TFunction): (option: string) => string;
}
