import axios from 'axios';
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import routes from '../routes/index';
import { GlobalState, Currencies, CurrenciesState } from '../types/interfaces';

const defaultCurrency = 'RUB';
const defaultCurrencyIndex = 120; //index of 'RUB' from Api

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

const selectCurrenciesState = (state: GlobalState) => state.currencies;

export const selectCurrentCurrencyId = createSelector(
  selectCurrenciesState,
  (state: CurrenciesState) => state.currentCurrencyId,
);

export const selectAll = createSelector(
  selectCurrenciesState,
  (state: CurrenciesState) => state.currenciesRates,
);

export const selectCurrentCurrency = createSelector(
  selectAll,
  selectCurrentCurrencyId,
  (currenciesRates, id) => currenciesRates[id],
);

export const selectCurrentRates = createSelector(
  selectAll,
  selectCurrentCurrencyId,
  (currenciesRates, currentId) => currenciesRates.filter(({ id }) => currentId !== id),
);

export const selectCurrenciesNames = createSelector(selectAll, (currenciesRates) =>
  currenciesRates.map(({ currency }) => currency),
);

export const { actions } = currenciesSlice;

export default currenciesSlice.reducer;
