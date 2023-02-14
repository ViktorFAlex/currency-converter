import axios from 'axios';
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import routes from '../routes/index';

export interface Currencies {
  currency: string;
  value: number;
  id: number;
}

interface CurrenciesState {
  currentCurrencyId: number;
  currenciesRates: Currencies[];
}

interface GlobalState {
  currencies: CurrenciesState;
}

const defaultCurrency = 'RUB';
const defaultCurrencyIndex = 120;

export const fetchCurrencies = createAsyncThunk(
  'currencies/fetchCurrencies',
  async (currency: string = defaultCurrency) => {
    try {
      const url = new URL(`?base=${currency}`, routes.rates());
      const response = await axios.get(url.href);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      throw e;
    }
  },
);

const initialState: CurrenciesState = {
  currentCurrencyId: defaultCurrencyIndex,
  currenciesRates: [],
};

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    setCurrency: (state, { payload }) => {
      state.currentCurrencyId = payload.id;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.fulfilled, (state, { payload }) => {
      const { rates } = payload;
      const currencies = Object.keys(rates);
      const currenciesWithValue = currencies.map(
        (currency, id): Currencies => ({ currency, value: rates[currency], id }),
      );
      state.currenciesRates = currenciesWithValue;
    });
  },
});

const selectState = (state: GlobalState) => state.currencies;

export const selectCurrentCurrencyId = createSelector(
  selectState,
  (state: CurrenciesState) => state.currentCurrencyId,
);

export const selectAll = createSelector(
  selectState,
  (state: CurrenciesState) => state.currenciesRates,
);

export const selectCurrentCurrency = createSelector(
  selectState,
  selectCurrentCurrencyId,
  ({ currenciesRates }, id) => currenciesRates[id],
);

export const selectCurrentRates = createSelector(
  selectState,
  selectCurrentCurrencyId,
  ({ currenciesRates }, id) => [...currenciesRates.slice(0, id), ...currenciesRates.slice(id + 1)],
);

export const { actions } = currenciesSlice;

export default currenciesSlice.reducer;
