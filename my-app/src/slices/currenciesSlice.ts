import axios from 'axios';
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import routes from '../routes/index';
import { GlobalState, Currencies, CurrenciesState } from '../types/interfaces';

const defaultCurrency = 'RUB';

export const fetchCurrencies = createAsyncThunk(
  'currencies/fetchCurrencies',
  async (currency: string = defaultCurrency) => {
    try {
      const url = routes.rates(currency);
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
  currentCurrency: defaultCurrency,
  currenciesRates: [],
};

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    setCurrency: (state, { payload }) => {
      state.currentCurrency = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.fulfilled, (state, { payload }) => {
      const { rates } = payload;
      const currencies = Object.keys(rates);
      const currenciesWithValue = currencies.map(
        (currency): Currencies => ({ currency, value: rates[currency] }),
      );
      state.currenciesRates = currenciesWithValue;
    });
  },
});

const selectCurrenciesState = (state: GlobalState) => state.currencies;

export const selectAll = createSelector(
  selectCurrenciesState,
  (state: CurrenciesState) => state.currenciesRates,
);

export const selectCurrentCurrency = createSelector(
  selectCurrenciesState,
  (state) => state.currentCurrency,
);

export const selectCurrentRates = createSelector(
  selectAll,
  selectCurrentCurrency,
  (currenciesRates, current) => currenciesRates.filter(({ currency }) => currency !== current),
);

export const selectCurrenciesNames = createSelector(selectAll, (currenciesRates) =>
  currenciesRates.map(({ currency }) => currency),
);

export const { actions } = currenciesSlice;

export default currenciesSlice.reducer;
