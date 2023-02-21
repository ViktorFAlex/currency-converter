import { TFunction } from 'i18next';
import { FormikProps } from 'formik';

export interface Currencies {
  currency: string;
  value: number;
}

export interface CurrenciesState {
  currentCurrency: string;
  currenciesRates: Currencies[];
}
export interface FormikConverterValues {
  from: string;
  to: string;
  amount: string;
}

export interface Codes {
  [key: string]: string;
}

export interface ConverterState {
  from: string;
  to: string;
  amount: number;
  rate: number;
  result: number;
}

export interface GlobalState {
  currencies: CurrenciesState;
  converter: ConverterState;
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

export interface CurrenciesListFooterProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  count: number;
}

export interface CurrenciesListBodyProps {
  currency: string;
  value: number;
}

type FormikType = FormikProps<FormikConverterValues>;

export interface ConverterFormikProps {
  formik: FormikType;
}

export interface ConverterProps extends ConverterFormikProps {
  field: string;
}

export interface ConverterFieldsBlur {
  (formik: FormikType, field: string): void;
}
