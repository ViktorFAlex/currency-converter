import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes/index';
import { ConverterState, GlobalState } from '../types/interfaces';

export const fetchConvert = createAsyncThunk(
  'converter/fetchConvert',
  async ({ from, to, amount = '1' }: { from: string; to: string; amount: string }) => {
    try {
      const url = routes.convert(from, to, amount);
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

const initialState: ConverterState = {
  from: '',
  to: '',
  amount: 0,
  rate: 0,
  result: 0,
};

const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchConvert.fulfilled, (state, { payload }) => {
      const { from, to, amount } = payload.query;
      const { rate } = payload.info;
      const { result } = payload;
      return { ...state, from, to, amount, rate, result };
    });
  },
});

export const selectConverterState = (state: GlobalState) => state.converter;

export const { actions } = converterSlice;
export default converterSlice.reducer;
